import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateProjectDto } from '../DTO/update-project.dto';
import { ProjectResponse } from '../interface/project-response.interface';
import { ProjectType } from '@prisma/client';
import { ProjectWithImages } from '../interface/projects.interface';

@Injectable()
export class ProjectsUpdateService {
  constructor(private prisma: PrismaService) {}

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectResponse> {
    try {
      const { type, ...rest } = updateProjectDto;
      const project = await this.prisma.project.update({
        where: { id },
        data: {
          ...rest,
          type: type as ProjectType | undefined,
        },
        include: { images: true },
      });
      return {
        message: 'Projeto atualizado com sucesso',
        data: project as ProjectWithImages,
      };
    } catch {
      throw new NotFoundException('Projeto não encontrado');
    }
  }
}
