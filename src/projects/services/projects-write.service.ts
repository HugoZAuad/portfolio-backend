import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProjectDto } from '../DTO/create-project.dto';
import { ProjectResponse } from '../interface/project-response.interface';
import { CloudinaryService } from './cloudinary.service';
import { ProjectWithImages } from '../interface/projects.interface';
import { ProjectImage } from '@prisma/client';

@Injectable()
export class ProjectsWriteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    files?: Express.Multer.File[],
  ): Promise<ProjectResponse> {
    const project = await this.prisma.project.create({
      data: {
        title: createProjectDto.title,
        description: createProjectDto.description,
        type: createProjectDto.type,
        linkRepo: createProjectDto.linkRepo,
        linkDeploy: createProjectDto.linkDeploy,
      },
      include: { images: true },
    });

    if (files?.length) {
      const uploadedImages: ProjectImage[] = [];

      for (const file of files) {
        const uploadResult: { secure_url: string } =
          await this.cloudinaryService.uploadImage(file);
        const image = await this.prisma.projectImage.create({
          data: {
            url: uploadResult.secure_url,
            projectId: project.id,
          },
        });
        uploadedImages.push(image);
      }

      const updatedProject = await this.prisma.project.findUnique({
        where: { id: project.id },
        include: { images: true },
      });

      return {
        message: 'Projeto criado com sucesso',
        data: updatedProject as ProjectWithImages,
      };
    }

    return {
      message: 'Projeto criado com sucesso',
      data: project as ProjectWithImages,
    };
  }
}
