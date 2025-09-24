import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ProjectWithImages } from '../interface/projects.interface';

@Injectable()
export class ProjectsFindAllService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10): Promise<ProjectWithImages[]> {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    return this.prisma.project.findMany({
      skip,
      take: limitNumber,
      orderBy: { createdAt: 'desc' },
      include: { images: true },
    });
  }
}
