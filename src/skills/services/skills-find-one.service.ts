import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { SkillWithLevel } from '../interface/skills.interface';

@Injectable()
export class SkillsFindOneService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<SkillWithLevel> {
    const skill = await this.prisma.skill.findUnique({
      where: { id },
    });
    if (!skill) {
      throw new NotFoundException('Habilidade não encontrada');
    }
    return skill;
  }
}
