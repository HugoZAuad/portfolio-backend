import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ProjectsFindAllService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = '1', limit = '10') {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        skip,
        take: limitNumber,
        orderBy: { createdAt: 'desc' },
        include: { images: true },
      }),
      this.prisma.project.count(),
    ]);

    const hasMore = skip + projects.length < total;

    return {
      projects,
      total,
      page: pageNumber,
      limit: limitNumber,
      hasMore,
    };
  }
}
