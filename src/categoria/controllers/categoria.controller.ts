import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../entities/categoria.entity';

@Controller('/categoria')
export class CategoriaController {

  constructor(
    private readonly service: CategoriaService
  ) {}

  @Post()
  create(@Body() categoria: Categoria) {
    return this.service.create(categoria);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Put()
  update(@Body() categoria: Categoria) {
    return this.service.update(categoria);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}