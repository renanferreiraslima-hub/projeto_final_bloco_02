import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entities/produto.entity';

@Controller('produto')
export class ProdutoController {

  constructor(private readonly produtoService: ProdutoService) {}

  // Criar produto
  @Post()
  async create(@Body() produto: Produto) {
    return this.produtoService.create(produto);
  }

  // Listar todos
  @Get()
  async findAll() {
    return this.produtoService.findAll();
  }

  // Buscar por ID
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.produtoService.findById(id);
  }

  // Buscar por nome
  @Get('nome/:nome')
  async findByNome(@Param('nome') nome: string) {
    return this.produtoService.findByNome(nome);
  }

  // Atualizar produto
  @Put(':id')
  async update(@Param('id') id: number, @Body() dados: Partial<Produto>) {
    return this.produtoService.update(id, dados);
  }

  // Deletar produto
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.produtoService.delete(id);
  }
}