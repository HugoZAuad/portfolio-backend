import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateSkillDto } from '../DTO/update-skill.dto';
import { SkillWithLevel } from '../interface/skills.interface';

@Injectable()
export class SkillsUpdateService {
  constructor(private prisma: PrismaService) {}

  async update(
    id: number,
    updateSkillDto: UpdateSkillDto,
  ): Promise<SkillWithLevel> {
    try {
      return await this.prisma.skill.update({
        where: { id },
        data: updateSkillDto,
      });
    } catch {
      throw new NotFoundException('Habilidade não encontrada');
    }
  }
}
