import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsDate,
  IsMongoId,
  IsOptional,
  Length,
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
  @Length(8, 25)
  password: string;
}

export class PasswordChangeDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 25)
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
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
