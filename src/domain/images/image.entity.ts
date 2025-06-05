import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'images' })
export class FilmImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'bytea' })
  data: Buffer;

  @Column()
  mimetype: string;
}
