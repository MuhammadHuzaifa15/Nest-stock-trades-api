import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Create {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  user: {
    id: number;
    name: string;
  };

  @IsString()
  @IsNotEmpty()
  symbol: string;

  @IsNumber()
  shares: number;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  timestamp: string;
}
