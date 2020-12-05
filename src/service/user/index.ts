import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entity/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findUserById(id: number) {
    return this.userRepository.findOne(id);
  }

  /**
   * 根据用户手机号查询用户
   * @param {string} phone
   * @return Promise<User>
   */
  findUserByPhone(phone: string) {
    return this.userRepository.findOne({
      where: { phone },
    });
  }

  /**
   * 保存用户
   * @param {User} user
   */
  saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
