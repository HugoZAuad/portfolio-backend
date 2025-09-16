import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateSkillDto } from '../DTO/create-skill.dto';
import { SkillResponse } from '../interface/skill-response.interface';

@Injectable()
export class SkillsWriteService {
  constructor(private prisma: PrismaService) {}

  async create(createSkillDto: CreateSkillDto): Promise<SkillResponse> {
    const skill = await this.prisma.skill.create({
      data: createSkillDto,
    });
    return {
      message: 'Habilidade criada com sucesso',
      data: skill,
    };
  }
}
