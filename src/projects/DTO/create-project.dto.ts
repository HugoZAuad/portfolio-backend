import { IsString, IsOptional, IsUrl, IsEnum } from 'class-validator';
import { ProjectType } from '@prisma/client';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(ProjectType)
  type: ProjectType;

  @IsOptional()
  @IsUrl()
  linkRepo?: string;

  @IsOptional()
  @IsUrl()
  linkDeploy?: string;
}
