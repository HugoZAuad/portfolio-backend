import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

import { ProjectsFindAllService } from '../services/projects-find-all.service';
import { ProjectsFindOneService } from '../services/projects-find-one.service';
import { ProjectsWriteService } from '../services/projects-write.service';
import { ProjectsUpdateService } from '../services/projects-update.service';
import { ProjectsDeleteService } from '../services/projects-delete.service';
import { CreateProjectDto } from '../DTO/create-project.dto';
import { UpdateProjectDto } from '../DTO/update-project.dto';
import { ProjectWithImages } from '../interface/projects.interface';
import {
  DeleteResponse,
  ProjectResponse,
} from '../interface/project-response.interface';
import { EmailGuard } from 'shared/guards/email.guard';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsFindAllService: ProjectsFindAllService,
    private readonly projectsFindOneService: ProjectsFindOneService,
    private readonly projectsWriteService: ProjectsWriteService,
    private readonly projectsUpdateService: ProjectsUpdateService,
    private readonly projectsDeleteService: ProjectsDeleteService,
  ) {}

  @UseGuards(JwtAuthGuard, EmailGuard)
  @Get()
  async findAll(): Promise<ProjectWithImages[]> {
    return this.projectsFindAllService.findAll();
  }

  @UseGuards(JwtAuthGuard, EmailGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProjectWithImages> {
    return this.projectsFindOneService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, EmailGuard)
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ProjectResponse> {
    return this.projectsWriteService.create(createProjectDto);
  }

  @UseGuards(JwtAuthGuard, EmailGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectResponse> {
    return this.projectsUpdateService.update(+id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard, EmailGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResponse> {
    return this.projectsDeleteService.delete(+id);
  }
}
