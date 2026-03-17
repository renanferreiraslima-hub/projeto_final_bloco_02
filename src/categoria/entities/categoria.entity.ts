import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, Length } from "class-validator";

@Entity({ name: "tb_categorias" })
export class Categoria {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Length(3, 255)
  @Column({ length: 255, nullable: false })
  nome: string;

  @Length(0, 5000)
  @Column({ length: 5000, nullable: true })
  descricao: string;
}