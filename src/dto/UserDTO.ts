import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from '../entity/user';

export class RegisterBody {
  @IsString()
  readonly phone: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;
}

export class LoginBody {
  @IsString()
  readonly phone: string;

  @IsString()
  readonly password: string;
}

export class ResponseUser extends User {
  token: string;

  @Exclude()
  password: string;
}
