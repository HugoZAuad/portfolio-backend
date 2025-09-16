import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { SkillWithLevel } from '../interface/skills.interface';

@Injectable()
export class SkillsFindAllService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<SkillWithLevel[]> {
    return this.prisma.skill.findMany();
  }
}
