import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsDate,
  IsMongoId,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

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
        '1 lowercase character,' +
        '1 numeric digit and ' +
        '1 special character.',
    },
  )
  @Length(8, 25)
  password: string;
}

export class PasswordChangeDto {
  @IsOptional()
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
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
    ),
    {
      message:
        'Password must contain at least 1 uppercase character, ' +
        '1 lowercase character,' +
        '1 numeric digit and ' +
        '1 special character.',
    },
  )
  @Length(8, 25)
  newPassword: string;
}

export class ProfileUpdateDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}

export class UserResponseDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
