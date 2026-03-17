import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { IsNotEmpty, IsNumber, Min, Length } from "class-validator";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({ name: "tb_produtos" })
export class Produto {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Length(3, 255)
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Length(5, 1000)
  @Column({ length: 1000, nullable: false })
  descricao: string;

  @IsNumber()
  @Min(0)
  @Column("decimal", { precision: 10, scale: 2 })
  preco: number;

  @IsNotEmpty()
  @Column()
  categoriaId: number;

  @ManyToOne(() => Categoria, { onDelete: "CASCADE" })
  @JoinColumn({ name: "categoriaId" })
  categoria: Categoria;
}