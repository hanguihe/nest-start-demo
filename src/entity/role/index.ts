import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 10,
    comment: '角色名称',
  })
  name: string;

  @ManyToMany(
    () => User,
    user => user.roles,
  )
  users: User[];
}
