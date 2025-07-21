import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBeerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString({
    each: true,
  })
  members: string[];

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  albums: number;
}
