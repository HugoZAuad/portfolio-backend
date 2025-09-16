import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ProjectWithImages } from '../interface/projects.interface';

@Injectable()
export class ProjectsReadService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ProjectWithImages[]> {
    return this.prisma.project.findMany({
      include: { images: true },
    });
  }

  async findOne(id: number): Promise<ProjectWithImages> {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return project;
  }
}
