import { IsString, IsOptional, IsUrl, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @Transform(
    ({ value }) =>
      (value as string).charAt(0).toUpperCase() +
      (value as string).slice(1).toLowerCase(),
  )
  @IsIn(['Frontend', 'Backend', 'Fullstack'])
  type: string;

  @IsOptional()
  @IsUrl()
  linkRepo?: string;

  @IsOptional()
  @IsUrl()
  linkDeploy?: string;
}
