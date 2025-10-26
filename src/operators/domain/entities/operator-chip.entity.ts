export interface OperatorChipEntity {
  _id?: string;
  operator: string;
  currency: string;
  number: string;
  value: number;
  color: string;
  active?: boolean;
  order: number;
}
