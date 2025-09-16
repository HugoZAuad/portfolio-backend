import { IsString, IsEnum } from 'class-validator';

enum SkillLevel {
  basico = 'basico',
  intermediario = 'intermediario',
  avancado = 'avancado',
  especialista = 'especialista',
}

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsEnum(SkillLevel)
  level: SkillLevel;
}
