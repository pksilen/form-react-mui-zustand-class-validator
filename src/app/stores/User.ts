import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  id?: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  streetAddress: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  zipCode: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;
}
