import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProjectDto } from '../DTO/create-project.dto';
import { UpdateProjectDto } from '../DTO/update-project.dto';
import { ProjectWithImages } from '../interface/projects.interface';
import { ProjectResponse } from '../interface/project-response.interface';

@Injectable()
export class ProjectsWriteService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectResponse> {
    const project = await this.prisma.project.create({
      data: createProjectDto,
      include: { images: true },
    });
    return {
      message: 'Projeto criado com sucesso',
      data: project,
    };
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectWithImages> {
    try {
      return await this.prisma.project.update({
        where: { id },
        data: updateProjectDto,
        include: { images: true },
      });
    } catch {
      throw new NotFoundException('Projeto não encontrado');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prisma.project.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException('Projeto não encontrado');
    }
  }
}
