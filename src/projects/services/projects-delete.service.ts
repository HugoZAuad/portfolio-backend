import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { DeleteResponse } from '../interface/project-response.interface';

@Injectable()
export class ProjectsDeleteService {
  constructor(private prisma: PrismaService) {}

  async delete(id: number): Promise<DeleteResponse> {
    try {
      await this.prisma.project.delete({
        where: { id },
      });
      return {
        message: 'Projeto deletado com sucesso',
      };
    } catch {
      throw new NotFoundException('Projeto não encontrado');
    }
  }
}
