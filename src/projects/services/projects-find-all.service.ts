import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ProjectWithImages } from '../interface/projects.interface';

@Injectable()
export class ProjectsFindAllService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10): Promise<ProjectWithImages[]> {
    const skip = (page - 1) * limit;
    return this.prisma.project.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { images: true },
    });
  }
}
