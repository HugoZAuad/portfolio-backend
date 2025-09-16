import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ProjectWithImages } from '../interface/projects.interface';

@Injectable()
export class ProjectsFindAllService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ProjectWithImages[]> {
    return this.prisma.project.findMany({
      include: { images: true },
    });
  }
}
