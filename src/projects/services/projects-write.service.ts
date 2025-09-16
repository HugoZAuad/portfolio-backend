import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProjectDto } from '../DTO/create-project.dto';
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
}
