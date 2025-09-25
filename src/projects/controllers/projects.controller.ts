import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { ProjectsFindAllService } from '../services/projects-find-all.service';
import { ProjectsFindOneService } from '../services/projects-find-one.service';
import { ProjectsWriteService } from '../services/projects-write.service';
import { ProjectsUpdateService } from '../services/projects-update.service';
import { ProjectsDeleteService } from '../services/projects-delete.service';
import { CreateProjectDto } from '../DTO/create-project.dto';
import { UpdateProjectDto } from '../DTO/update-project.dto';
import {
  PaginatedProjectsResponse,
  ProjectWithImages,
} from '../interface/projects.interface';
import { ProjectResponse } from '../interface/project-response.interface';
import { Public } from 'shared/decorators/public.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsFindAllService: ProjectsFindAllService,
    private readonly projectsFindOneService: ProjectsFindOneService,
    private readonly projectsWriteService: ProjectsWriteService,
    private readonly projectsUpdateService: ProjectsUpdateService,
    private readonly projectsDeleteService: ProjectsDeleteService,
  ) {}

  @Public()
  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
  ): Promise<PaginatedProjectsResponse> {
    return this.projectsFindAllService.findAll(page, limit);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProjectWithImages> {
    return this.projectsFindOneService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('image', 10))
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ): Promise<ProjectResponse> {
    return this.projectsWriteService.create(createProjectDto, files);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectResponse> {
    return this.projectsUpdateService.update(+id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.projectsDeleteService.delete(+id);
  }
}
