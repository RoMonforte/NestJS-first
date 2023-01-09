import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";


@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({type: 'varchar',})
  password: string;

  @Column({type: 'varchar',})
  role: string;
}
