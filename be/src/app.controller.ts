import { Controller, Get, Post, Body, Req, Delete, Param, Query, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDataDto, UpdateDataDto } from 'src/data.dto';

@Controller("data")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll() {
    return this.appService.getAll();
  }

  @Post()
  create(@Body() body: CreateDataDto) {
    return this.appService.create(body);
  }

  @Delete()
  delete (@Query('id') id: string) {
    return this.appService.delete(id);
  }
  
  @Put()
  update(@Body() body: UpdateDataDto) {
    console.log("BODY:", body);
    return this.appService.update(body);
  }
}
