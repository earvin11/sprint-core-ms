export abstract class WalletAuthPort {
  abstract sendAuth(
    url: string,
    data: AuthWalletRequest,
    timeout?: number,
  ): Promise<any>;
}

export interface AuthWalletRequest {
  token: string;
}
