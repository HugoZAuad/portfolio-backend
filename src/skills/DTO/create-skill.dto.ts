import { IsString, IsEnum } from 'class-validator';
import { SkillLevel } from '@prisma/client';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsEnum(SkillLevel)
  level: SkillLevel;
}
