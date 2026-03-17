import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../entities/categoria.entity';

@Controller('/categoria')
export class CategoriaController {

  constructor(
    private readonly categoriaService: CategoriaService // nome consistente
  ) {}

  @Post()
  create(@Body() categoria: Categoria) {
    return this.categoriaService.create(categoria);
  }

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.categoriaService.findById(id);
  }

  @Get('/nome/:nome')
  findByNome(@Param('nome') nome: string) {
    return this.categoriaService.findByNome(nome); // agora vai funcionar
  }

  @Put()
  update(@Body() categoria: Categoria) {
    return this.categoriaService.update(categoria);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.categoriaService.delete(id);
  }
}