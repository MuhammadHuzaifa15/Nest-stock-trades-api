import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export interface IGetAll {
  name: string;
  size: string;
  page: string;
  sort: string;
}

export class ICreate {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class IUpdate {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
