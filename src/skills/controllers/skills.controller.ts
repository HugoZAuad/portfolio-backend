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
import { EmailGuard } from '../../../shared/guards/email.guard';

import { SkillsFindAllService } from '../services/skills-find-all.service';
import { SkillsFindOneService } from '../services/skills-find-one.service';
import { SkillsWriteService } from '../services/skills-write.service';
import { SkillsUpdateService } from '../services/skills-update.service';
import { SkillsDeleteService } from '../services/skills-delete.service';

import { CreateSkillDto } from '../DTO/create-skill.dto';
import { UpdateSkillDto } from '../DTO/update-skill.dto';
import { SkillWithLevel } from '../interface/skills.interface';
import {
  SkillResponse,
  DeleteResponse,
} from '../interface/skill-response.interface';

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly skillsFindAllService: SkillsFindAllService,
    private readonly skillsFindOneService: SkillsFindOneService,
    private readonly skillsWriteService: SkillsWriteService,
    private readonly skillsUpdateService: SkillsUpdateService,
    private readonly skillsDeleteService: SkillsDeleteService,
  ) {}

  @UseGuards(JwtAuthGuard, EmailGuard)
  @Get()
  async findAll(): Promise<SkillWithLevel[]> {
    return this.skillsFindAllService.findAll();
  }

  @UseGuards(JwtAuthGuard, EmailGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SkillWithLevel> {
    return this.skillsFindOneService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, EmailGuard)
  @Post()
  async create(@Body() createSkillDto: CreateSkillDto): Promise<SkillResponse> {
    return this.skillsWriteService.create(createSkillDto);
  }

  @UseGuards(JwtAuthGuard, EmailGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<SkillWithLevel> {
    return this.skillsUpdateService.update(+id, updateSkillDto);
  }

  @UseGuards(JwtAuthGuard, EmailGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResponse> {
    await this.skillsDeleteService.delete(+id);
    return { message: 'Habilidade deletada com sucesso' };
  }
}
