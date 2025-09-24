import { Project, ProjectImage } from '@prisma/client';
import { CreateProjectDto } from '../DTO/create-project.dto';
import { UpdateProjectDto } from '../DTO/update-project.dto';

export type ProjectWithImages = Project & { images: ProjectImage[] };

export interface PaginatedProjectsResponse {
  projects: ProjectWithImages[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface IProjectsService {
  findAll(page?: string, limit?: string): Promise<PaginatedProjectsResponse>;
  findOne(id: number): Promise<ProjectWithImages>;
  create(createProjectDto: CreateProjectDto): Promise<ProjectWithImages>;
  update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectWithImages>;
  delete(id: number): Promise<void>;
}
