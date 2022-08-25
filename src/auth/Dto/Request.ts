import { IsString, IsNotEmpty } from 'class-validator';

export class ISignIn {
  @IsString()
  @IsNotEmpty()
  name: string;
}
