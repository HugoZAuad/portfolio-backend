import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateProjectDto } from '../DTO/update-project.dto';
import { ProjectResponse } from '../interface/projects.interface';
import { ProjectWithImages } from '../interface/projects.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsUpdateService {
  constructor(private prisma: PrismaService) {}

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto & { newImages?: { url: string }[] },
  ): Promise<ProjectResponse> {
    try {
      const { type, newImages, ...rest } = updateProjectDto;
      const dataToUpdate: Prisma.ProjectUpdateInput = {
        ...rest,
        type: type,
      };

      if (newImages && newImages.length > 0) {
        dataToUpdate.images = {
          create: newImages.map((image) => ({
            url: image.url,
          })),
        };
      }
      const project = await this.prisma.project.update({
        where: { id },
        data: dataToUpdate,
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
