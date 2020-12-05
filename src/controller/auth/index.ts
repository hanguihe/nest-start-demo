import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '../../base/ApiResponse';
import { AuthService } from '../../service/auth';
import { LoginBody, RegisterBody } from '../../dto/UserDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard())
  @Get('/validate')
  async authValidate(@Request() req) {
    const { id } = req.user;
    const token = req.headers.authorization.replace('Bearer ', '');

    const res = await this.authService.validate(id, token);
    if (res.isSuccess()) {
      return ApiResponse.success(res.getResult());
    }
    return ApiResponse.warn(res.getMessage());
  }

  @Post('/login')
  async authLogin(@Body() body: LoginBody): Promise<ApiResponse> {
    const { phone, password } = body;

    const res = await this.authService.login(phone, password);

    if (res.isSuccess()) {
      return ApiResponse.success(res.getResult());
    }
    return ApiResponse.warn(res.getMessage());
  }

  @Post('/register')
  async authRegister(@Body() body: RegisterBody) {
    const res = await this.authService.register(body);

    if (res.isSuccess()) {
      return ApiResponse.success(res.getResult());
    }

    return ApiResponse.warn(res.getMessage());
  }
}
