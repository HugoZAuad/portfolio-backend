import { SkillWithLevel } from './skills.interface';

export interface SkillResponse {
  message: string;
  data: SkillWithLevel;
}

export interface DeleteResponse {
  message: string;
}
