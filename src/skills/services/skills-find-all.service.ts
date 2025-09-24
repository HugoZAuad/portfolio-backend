import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { SkillWithLevel } from '../interface/skills.interface';

@Injectable()
export class SkillsFindAllService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10): Promise<SkillWithLevel[]> {
    const skip = (page - 1) * limit;
    return this.prisma.skill.findMany({
      skip,
      take: limit,
      orderBy: { level: 'desc' },
    });
  }
}
