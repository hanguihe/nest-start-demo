import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type:"varchar",
    length: 15
  })
  name: string;

  @Column({
    type: "varchar",
    length: 30
  })
  password: string

  @Column({
    type: "varchar",
    length: 18
  })
  phone: string;

  @Column({
    type: "varchar",
    length: 30,
    nullable: true
  })
  email: string;
}