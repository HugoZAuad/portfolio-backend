import { IsString, IsOptional, IsUrl, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ProjectType } from '@prisma/client';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @Transform(
    ({ value }: { value: string }) =>
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  )
  @IsEnum(ProjectType)
  type: ProjectType;

  @IsOptional()
  @IsUrl()
  linkRepo?: string;

  @IsOptional()
  @IsUrl()
  linkDeploy?: string;
}
