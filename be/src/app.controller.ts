import { Controller, Get, Post, Body, Req, Delete, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { DataDto } from 'src/data.dto';

@Controller("data")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll() {
    return this.appService.getAll();
  }

  @Post()
  create(@Body() body: DataDto) {
    return this.appService.create(body);
  }

  @Delete()
  delete (@Query('id') id: string) {
    return this.appService.delete(id);
  }
  
}
