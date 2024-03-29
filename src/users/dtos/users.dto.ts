import { IsString, IsNotEmpty, IsPositive, IsNumber, IsOptional, IsUrl } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly customerId: number;

  @IsOptional()
  @ApiProperty()
  @IsUrl()
  readonly image: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
