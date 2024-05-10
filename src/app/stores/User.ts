import { IsEmail, IsNotEmpty } from 'class-validator';


export class User {
  id?: string;

  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @IsNotEmpty({ message: 'Street address is required' })
  streetAddress: string;

  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @IsNotEmpty({ message: 'Zip code is required' })
  zipCode: string;

  @IsEmail(undefined, { message: 'Email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;
}
