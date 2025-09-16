import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProjectDto } from '../DTO/create-project.dto';
import { ProjectResponse } from '../interface/project-response.interface';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class ProjectsWriteService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    files?: Express.Multer.File[],
  ): Promise<ProjectResponse> {
    const project = await this.prisma.project.create({
      data: createProjectDto,
      include: { images: true },
    });

    if (files && files.length > 0) {
      for (const file of files) {
        const uploadResult = await this.cloudinaryService.uploadImage(file);
        await this.prisma.projectImage.create({
          data: {
            url: uploadResult.secure_url,
            projectId: project.id,
          },
        });
      }
      // Re-fetch to include the new images
      const updatedProject = await this.prisma.project.findUnique({
        where: { id: project.id },
        include: { images: true },
      });
      return {
        message: 'Projeto criado com sucesso',
        data: updatedProject!,
      };
    }

    return {
      message: 'Projeto criado com sucesso',
      data: project,
    };
  }
}
