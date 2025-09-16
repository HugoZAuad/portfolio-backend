import { ProjectWithImages } from './projects.interface';

export interface ProjectResponse {
  message: string;
  data: ProjectWithImages;
}

export interface DeleteResponse {
  message: string;
}
