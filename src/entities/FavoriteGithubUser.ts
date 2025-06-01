import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('favorite_github_users')
export class FavoriteGithubUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  githubUserId: string;

  @Column()
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 