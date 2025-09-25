import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PaginatedProjectsResponse } from '../interface/projects.interface';

@Injectable()
export class ProjectsFindAllService {
  private readonly logger = new Logger(ProjectsFindAllService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10): Promise<PaginatedProjectsResponse> {
    try {
      const skip = (page - 1) * limit;

      const [projects, total] = await Promise.all([
        this.prisma.project.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: { images: true },
        }),
        this.prisma.project.count(),
      ]);

      const hasMore = skip + projects.length < total;

      return {
        projects,
        total,
        page,
        limit,
        hasMore,
      };
    } catch (error) {
      this.logger.error('Erro ao buscar projetos:', error);
      throw new InternalServerErrorException(
        'Ocorreu um erro ao buscar os projetos.',
      );
    }
  }
}
