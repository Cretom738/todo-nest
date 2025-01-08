import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ETaskStatus } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsEnum(ETaskStatus)
  status: ETaskStatus;
}
