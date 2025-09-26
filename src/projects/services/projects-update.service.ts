import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateProjectDto } from '../DTO/update-project.dto';
import { ProjectResponse } from '../interface/projects.interface';
import { ProjectWithImages } from '../interface/projects.interface';
import { Prisma } from '@prisma/client';
import { CloudinaryService } from '../../projects/services/cloudinary.service';

@Injectable()
export class ProjectsUpdateService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
    file?: Express.Multer.File,
  ): Promise<ProjectResponse> {
    try {
      const dataToUpdate: Prisma.ProjectUpdateInput = {
        ...updateProjectDto,
      };
      if (file) {
        const uploadResult = await this.cloudinaryService.uploadImage(file);
        dataToUpdate.images = {
          create: [
            {
              url: uploadResult.secure_url,
            },
          ],
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
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Projeto não encontrado');
      }
      throw error;
    }
  }
}
