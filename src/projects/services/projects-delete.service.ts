import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { DeleteResponse } from '../interface/projects.interface';

@Injectable()
export class ProjectsDeleteService {
  constructor(private prisma: PrismaService) {}

  async delete(idString: string): Promise<DeleteResponse> {
    const id = parseInt(idString, 10);
    if (isNaN(id)) {
      throw new NotFoundException('ID do projeto inválido.');
    }

    try {
      await this.prisma.projectImage.deleteMany({
        where: {
          projectId: id,
        },
      });

      await this.prisma.project.delete({
        where: { id },
      });

      return {
        message: 'Projeto deletado com sucesso',
      };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2025' || error instanceof NotFoundException) {
        throw new NotFoundException('Projeto não encontrado');
      }
      throw error;
    }
  }
}
