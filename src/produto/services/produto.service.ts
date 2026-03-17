import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { Produto } from '../entities/produto.entity';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Injectable()
export class ProdutoService {

  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  // Criar produto
  async create(produto: Produto): Promise<Produto> {
    const categoria = await this.categoriaRepository.findOneBy({
      id: produto.categoriaId,
    });

    if (!categoria) {
      throw new NotFoundException("Categoria não encontrada");
    }

    produto.categoria = categoria;

    return this.produtoRepository.save(produto);
  }

  // Listar todos os produtos
  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find({
      relations: ["categoria"],
    });
  }

  // Buscar produto pelo ID
  async findById(id: number): Promise<Produto | null> {
    return this.produtoRepository.findOne({
      where: { id },
      relations: ["categoria"],
    });
  }

  // Buscar produto pelo nome
  async findByNome(nome: string): Promise<Produto[]> {
    return this.produtoRepository.find({
      where: { nome: Like(`%${nome}%`) },
      relations: ["categoria"],
    });
  }

  // Atualizar produto
  async update(id: number, dados: Partial<Produto>): Promise<Produto> {
    const produtoExistente = await this.findById(id);

    if (!produtoExistente) {
      throw new NotFoundException("Produto não encontrado");
    }

    // Se veio categoriaId, busca a categoria
    if (dados.categoriaId) {
      const categoria = await this.categoriaRepository.findOneBy({
        id: dados.categoriaId,
      });

      if (!categoria) {
        throw new NotFoundException("Categoria não encontrada");
      }

      produtoExistente.categoria = categoria;
    }

    // Faz merge dos dados recebidos
    const produtoAtualizado = this.produtoRepository.merge(produtoExistente, dados);

    return this.produtoRepository.save(produtoAtualizado);
  }

  // Deletar produto
  async delete(id: number) {
    const produto = await this.findById(id);

    if (!produto) {
      throw new NotFoundException("Produto não encontrado");
    }

    return this.produtoRepository.delete(id);
  }
}