import { Skill } from '@prisma/client';
import { CreateSkillDto } from '../DTO/create-skill.dto';
import { UpdateSkillDto } from '../DTO/update-skill.dto';

export type SkillWithLevel = Skill;

export interface ISkillsService {
  findAll(): Promise<SkillWithLevel[]>;
  findOne(id: number): Promise<SkillWithLevel>;
  create(createSkillDto: CreateSkillDto): Promise<SkillWithLevel>;
  update(id: number, updateSkillDto: UpdateSkillDto): Promise<SkillWithLevel>;
  delete(id: number): Promise<void>;
}
