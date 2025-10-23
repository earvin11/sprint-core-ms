export interface ClientRouletteEntity {
  _id?: string;
  client: string;
  roulette: string;
}

export interface findClientsRoulettes {
  _id: string;
  client: string;
  roulette: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  roulettefisic: string[];
  crupier: string[];
}
