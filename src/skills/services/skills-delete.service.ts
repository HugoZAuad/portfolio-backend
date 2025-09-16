import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class SkillsDeleteService {
  constructor(private prisma: PrismaService) {}

  async delete(id: number): Promise<void> {
    try {
      await this.prisma.skill.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException('Habilidade não encontrada');
    }
  }
}
