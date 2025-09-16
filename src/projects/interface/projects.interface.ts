import { Project, ProjectImage } from '@prisma/client';
import { CreateProjectDto } from '../DTO/create-project.dto';
import { UpdateProjectDto } from '../DTO/update-project.dto';

export type ProjectWithImages = Project & { images: ProjectImage[] };

export interface IProjectsService {
  findAll(): Promise<ProjectWithImages[]>;
  findOne(id: number): Promise<ProjectWithImages>;
  create(createProjectDto: CreateProjectDto): Promise<ProjectWithImages>;
  update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectWithImages>;
  delete(id: number): Promise<void>;
}
