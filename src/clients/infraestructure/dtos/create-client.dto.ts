import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  endpointAuth: string;

  @IsString()
  endpointRollback: string;

  @IsString()
  endpointBet: string;

  @IsString()
  endpointWin: string;

  @IsString()
  logo: string; // ahora obligatorio, según la entidad

  @IsString()
  loaderLogo: string; // ahora obligatorio

  @IsString()
  urlGames: string; // nuevo campo requerido

  @IsBoolean()
  @IsOptional()
  useLogo?: boolean; // opcional, pero tipado como booleano
}
