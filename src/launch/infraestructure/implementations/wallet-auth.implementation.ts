import { Injectable } from '@nestjs/common';
import {
  AuthWalletRequest,
  WalletAuthPort,
} from 'src/launch/domain/wallet-debit.port';
import { LoggerPort } from 'src/logging/domain/logger.port';

@Injectable()
export class WalletAuth implements WalletAuthPort {
  constructor(private readonly loggerPort: LoggerPort) {}
  async sendAuth(
    url: string,
    data: AuthWalletRequest,
    timeout = 1500,
  ): Promise<any> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    this.loggerPort.log('WALLET AUTH IMPLEMENTATION', data);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Agrega otros headers si son necesarios
          // "Authorization": "Bearer token",
        },
        body: JSON.stringify(data),
        signal: controller.signal, // 👈 Asociamos el signal para poder abortar
      });

      this.loggerPort.log('resp wallet debit', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
        url: response.url,
        redirected: response.redirected,
        type: response.type,
      });

      // fetch no lanza error por códigos de estado HTTP, solo por problemas de red
      if (!response.ok && response.status >= 500) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      // Si esperas una respuesta JSON
      return {
        status: response.status,
        data: responseData,
        headers: response.headers,
      };
    } catch (error) {
      // Manejo especial para timeout (AbortError)
      if (error.name === 'AbortError') {
        this.loggerPort.error(
          'ERROR IN AUTH WALLET -> Timeout exceeded',
          JSON.stringify({
            url,
            data,
            timeout,
          }),
        );
        throw new Error(`Request timeout after ${timeout}ms`);
      }

      // Otros errores
      this.loggerPort.error(
        'ERROR IN AUTH WALLET -> ',
        JSON.stringify({
          message: error.message,
          url,
          data,
          timeout,
        }),
      );
      throw error;
    } finally {
      // 👇 Limpiamos el timeout si la petición terminó antes
      clearTimeout(timeoutId);
    }
  }
}
