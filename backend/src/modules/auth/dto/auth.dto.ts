import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsIP,
  IsOptional,
  Matches,
  Length,
} from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
    ),
    {
      message:
        'Password must contain at least 1 uppercase character, ' +
        '1 lowercase character, ' +
        '1 numeric digit and ' +
        '1 special character.',
    },
  )
  @Length(8, 25)
  password: string;

  @IsOptional()
  @IsIP('4' || '6')
  ipAddress: string;
}
