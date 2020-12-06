import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Role } from '../../entity/role';
import { Repository } from 'typeorm';
import { User } from '../../entity/user';

@Injectable()
export class LifeCircleService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    if (this.configService.get('env') !== 'development') {
      return;
    }

    const roles = await this.roleRepository.save([
      { name: 'USER' },
      { name: 'ADMIN' },
    ]);

    const user = new User();
    user.name = '123';
    user.phone = '123';
    user.password = '123';
    user.roles = roles;

    await this.userRepository.save(user);
  }
}
