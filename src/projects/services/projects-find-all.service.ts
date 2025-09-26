import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  PaginatedProjectsResponse,
  ProjectWithImages,
  ProjectResponseFrontend,
} from '../interface/projects.interface';

@Injectable()
export class ProjectsFindAllService {
  constructor(private readonly prisma: PrismaService) {}

  private mapProjectToResponse(
    project: ProjectWithImages,
  ): ProjectResponseFrontend {
    const imageUrl =
      project.images.length > 0 ? project.images[0].url : undefined;

    return {
      ...project,
      imageUrl,
    } as ProjectResponseFrontend;
  }

  async findAll(page = 1, limit = 100): Promise<PaginatedProjectsResponse> {
    const skip = (page - 1) * limit;

    const [projects, total] = await this.prisma.$transaction([
      this.prisma.project.findMany({
        skip: skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { images: true },
      }),
      this.prisma.project.count(),
    ]);

    const mappedProjects = projects.map((p) => this.mapProjectToResponse(p));

    return {
      projects: mappedProjects,
      total: total,
      page: page,
      limit: limit,
      hasMore: page * limit < total,
    };
  }
}
