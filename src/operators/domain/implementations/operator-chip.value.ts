import { OperatorChipEntity } from '../entities/operator-chip.entity';

export class OperatorChip implements OperatorChipEntity {
  public operator: string;
  public currency: string;
  public number: string;
  public value: number;
  public color: string;
  public active?: boolean;
  public order: number;

  constructor(data: OperatorChipEntity) {
    this.operator = data.operator;
    this.currency = data.currency;
    this.number = data.number;
    this.value = data.value;
    this.color = data.color;
    this.active = data.active;
    this.order = data.order;
  }
}
