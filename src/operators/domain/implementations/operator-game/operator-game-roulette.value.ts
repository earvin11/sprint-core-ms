import { OperatorRouletteEntity } from '../../entities/operator-game/operator-game-roulette.entity';

export class OperatorRoulette implements OperatorRouletteEntity {
  public pleno?: number;
  public semipleno?: number;
  public cuadro?: number;
  public calle?: number;
  public linea?: number;
  public columna?: number;
  public docena?: number;
  public chanceSimple?: number;
  public cubre?: number;
  public specialCalle?: number;
  public layout?: boolean;
  public template?: string;
  public logo?: string;
  public operator: string;
  public game: string;
  public uuid?: string;
  public currencies: string[];
  public order?: number;

  constructor(data: OperatorRouletteEntity) {
    this.pleno = data.pleno;
    this.semipleno = data.semipleno;
    this.cuadro = data.cuadro;
    this.calle = data.calle;
    this.linea = data.linea;
    this.columna = data.columna;
    this.docena = data.docena;
    this.chanceSimple = data.chanceSimple;
    this.cubre = data.cubre;
    this.specialCalle = data.specialCalle;
    this.layout = data.layout;
    this.template = data.template;
    this.logo = data.logo;
  }
}
