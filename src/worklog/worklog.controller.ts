import { Controller, Get, Post, Body, Param, Put, Delete, Res, BadRequestException, NotFoundException, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { UploadedFile } from '@nestjs/common';

import { WorklogService } from './worklog.service';
import { Worklog } from './worklog.schema';

@Controller('worklog')
export class WorklogController {
  constructor(private readonly worklogService: WorklogService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() body: Partial<Worklog>, @UploadedFile() image: any): Promise<Worklog> {
    if (!image || !image.buffer) {
      throw new BadRequestException('Image file is missing.');
    }

    const worklog: Worklog = {
      datetime: new Date(),
      macos_user: body.macos_user,
      image: image.buffer,
    };

    return this.worklogService.create(worklog);
  }

  @Get()
  async findAll(): Promise<Worklog[]> {
    return this.worklogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Worklog> {
    const worklog = await this.worklogService.findOne(id);
    if (!worklog) {
      throw new NotFoundException('Worklog not found');
    }
    return worklog;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Worklog): Promise<Worklog> {
    const updatedWorklog = await this.worklogService.update(id, body);
    if (!updatedWorklog) {
      throw new NotFoundException('Worklog not found');
    }
    return updatedWorklog;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Worklog> {
    const deletedWorklog = await this.worklogService.delete(id);
    if (!deletedWorklog) {
      throw new NotFoundException('Worklog not found');
    }
    return deletedWorklog;
  }

  @Get('image/:id')
  async getImage(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const worklog = await this.worklogService.findOne(id);
    if (!worklog) {
      throw new NotFoundException('Worklog not found');
    }

    res.setHeader('Content-Type', 'image/png');
    res.send(worklog.image);
  }
}
