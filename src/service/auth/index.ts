import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user';
import { UserService } from '../user';
import { RegisterBody, ResponseUser } from '../../dto/UserDTO';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { ServiceResult } from '../../base/ServiceResult';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(id: number, token: string) {
    const user = await this.userService.findUserById(id);

    if (!user) {
      return ServiceResult.message('未找到该用户');
    }

    return ServiceResult.of(plainToClass(ResponseUser, { ...user, token }));
  }

  async login(phone: string, password: string) {
    const user = await this.userService.findUserByPhone(phone);
    if (!user) {
      return ServiceResult.message('该手机号未注册');
    }

    // 校验密码
    if (user.password === password) {
      const token = this.jwtService.sign({
        id: user.id,
        name: user.name,
        roles: [],
      });

      return ServiceResult.of(plainToClass(ResponseUser, { ...user, token }));
    }

    return ServiceResult.message('密码错误');
  }

  async register(body: RegisterBody) {
    let user = await this.userService.findUserByPhone(body.phone);
    if (user) {
      return ServiceResult.message('该手机号已注册');
    }

    user = new User();
    user.phone = body.phone;
    user.name = body.name;
    user.password = body.password;

    user = await this.userService.saveUser(user);

    return ServiceResult.of(plainToClass(ResponseUser, user));
  }
}
