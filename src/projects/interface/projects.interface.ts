import { Project, ProjectImage } from '@prisma/client';
import { CreateProjectDto } from '../DTO/create-project.dto';
import { UpdateProjectDto } from '../DTO/update-project.dto';

export type ProjectWithImages = Project & { images: ProjectImage[] };

export type ProjectResponseFrontend = ProjectWithImages & {
  imageUrl?: string;
};

export interface PaginatedProjectsResponse {
  projects: ProjectResponseFrontend[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ProjectResponse {
  message: string;
  data: ProjectWithImages;
}

export interface DeleteResponse {
  message: string;
}

export interface IProjectsService {
  findAll(page?: string, limit?: string): Promise<PaginatedProjectsResponse>;
  findOne(id: number): Promise<ProjectWithImages>;
  create(
    createProjectDto: CreateProjectDto,
    files?: Express.Multer.File[],
  ): Promise<ProjectWithImages>;
  update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectWithImages>;
  delete(id: number): Promise<void>;
}
