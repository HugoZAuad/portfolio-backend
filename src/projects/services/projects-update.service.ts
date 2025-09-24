import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateProjectDto } from '../DTO/update-project.dto';
import { ProjectResponse } from '../interface/project-response.interface';

@Injectable()
export class ProjectsUpdateService {
  constructor(private prisma: PrismaService) {}

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectResponse> {
    try {
      const project = await this.prisma.project.update({
        where: { id },
        data: {
          ...updateProjectDto,
          type: updateProjectDto.type,
        },
        include: { images: true },
      });
      return {
        message: 'Projeto atualizado com sucesso',
        data: project,
      };
    } catch {
      throw new NotFoundException('Projeto não encontrado');
    }
  }
}
