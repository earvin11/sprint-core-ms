import {
  AuthWalletRequest,
  WalletAuthPort,
} from 'src/launch/domain/wallet-auth.port';

export class WalletAuthMock implements WalletAuthPort {
  sendAuth(
    url: string,
    data: AuthWalletRequest,
    timeout?: number,
  ): Promise<any> {
    return new Promise((res, __rej) => {
      res({
        data: {
          ok: true,
          mensaje: 'Conexión Correcta.',
          userId: 2582778,
          username: 'sprinttest01',
          lastBalance: '1057248.8999999997',
          country_code: 'PY',
          email: 'sprinttest01@sprinttest01.com',
          first_name: 'Sprint',
          last_name: 'Test',
          currency: 'USD',
          available_balance: '1057248.8999999997',
          WL: 'Juegala',
        },
      });
    });
  }
}
