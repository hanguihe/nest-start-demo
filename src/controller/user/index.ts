import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../../service/user';
import { RegisterBody } from '../../dto/UserDTO';
import { User } from '../../entity/user';
import { ApiResponse } from '../../base/ApiResponse';
import { RoleService } from '../../service/role';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  @UseGuards(AuthGuard('admin'))
  @Post('/insert')
  async insertUser(@Body() body: RegisterBody) {
    const user = new User();
    Object.assign(user, body);
    user.roles = await this.roleService.findByIds(body.roles);

    const res = await this.userService.saveUser(user);

    if (res.isSuccess()) {
      return ApiResponse.success();
    }
    return ApiResponse.warn(res.getMessage());
  }
}
