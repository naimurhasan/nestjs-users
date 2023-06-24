import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ArticleEntity } from 'src/article/article.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany(type => ArticleEntity)
  @JoinTable()
  favorites: ArticleEntity[];

  @OneToMany(type => ArticleEntity, article => article.author)
  articles: ArticleEntity[];
}