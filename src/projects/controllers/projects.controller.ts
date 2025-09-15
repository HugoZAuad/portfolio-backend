import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return 'Protegido: Lista de projetos';
  }
}
