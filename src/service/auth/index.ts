import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user';
import { UserService } from '../user';
import { RegisterBody, ResponseUser } from '../../dto/UserDTO';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { ServiceResult } from '../../base/ServiceResult';
import { RoleService } from '../role';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
  ) {}

  getToken(user: User) {
    return this.jwtService.sign({
      id: user.id,
      phone: user.phone,
      roles: user.roles.map(item => item.name),
    });
  }

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
      const token = this.getToken(user);

      return ServiceResult.of(plainToClass(ResponseUser, { ...user, token }));
    }

    return ServiceResult.message('密码错误');
  }

  async register(body: RegisterBody) {
    const user = new User();
    user.phone = body.phone;
    user.name = body.name;
    user.password = body.password;
    user.roles = [await this.roleService.findRoleById(1)];

    return await this.userService.saveUser(user);
  }
}
