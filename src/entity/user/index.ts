import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 15,
    comment: '用户名',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '密码-加密存储',
  })
  password: string;

  @Column({
    unique: true,
    type:"varchar"',
    length: 18,
    comment:"手机号",
  })
  phone: string;

  @Column({
    unique: true,
    type: "varchar",
    length: 30,
    nullable: true,
    comment: "邮箱"
  })
  email: string;

  @ManyToMany(
    () => Role,
    role => role.users
  )
  @JoinTable({
    name: "user_role",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id"
    }
  })
  roles: Role[];
}
