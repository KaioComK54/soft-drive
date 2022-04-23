import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsIP,
  IsOptional,
} from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsIP('4' || '6')
  ipAddress: string;
}
