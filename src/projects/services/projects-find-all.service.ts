import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ProjectsFindAllService {
  private readonly logger = new Logger(ProjectsFindAllService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(page = '1', limit = '10') {
    try {
      this.logger.log(`Buscando projetos - Página: ${page}, Limite: ${limit}`);

      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = parseInt(limit, 10) || 10;
      const skip = (pageNumber - 1) * limitNumber;

      this.logger.log(
        `Parâmetros calculados - Página: ${pageNumber}, Limite: ${limitNumber}, Skip: ${skip}`,
      );

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

      this.logger.log(
        `Projetos encontrados: ${projects.length}, Total: ${total}, Tem mais: ${hasMore}`,
      );

      return {
        projects,
        total,
        page: pageNumber,
        limit: limitNumber,
        hasMore,
      };
    } catch (error) {
      this.logger.error('Erro ao buscar projetos:', error);

      if (error.code === 'P1001' || error.message.includes('connect')) {
        throw new InternalServerErrorException(
          'Erro de conexão com o banco de dados. Tente novamente mais tarde.',
        );
      }

      throw new InternalServerErrorException(
        'Erro interno do servidor. Tente novamente mais tarde.',
      );
    }
  }
}
