// import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateClientDto {
  //   @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  //   @ApiProperty()
  @IsString()
  @MinLength(3)
  endpointAuth: string;

  //   @ApiProperty()
  @IsString()
  endpointRollback: string;

  //   @ApiProperty()
  @IsString()
  endpointBet: string;

  //   @ApiProperty()
  @IsString()
  endpointWin: string;

  //   @ApiProperty()
  @IsString()
  @IsOptional()
  logo?: string;

  //   @ApiProperty()
  @IsString()
  @IsOptional()
  loaderLogo?: string;
}
