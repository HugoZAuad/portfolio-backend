import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  linkRepo?: string;

  @IsOptional()
  @IsUrl()
  linkDeploy?: string;
}
