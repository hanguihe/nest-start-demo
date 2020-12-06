import { IsString } from 'class-validator';
import { Exclude, Transform, Type } from 'class-transformer';
import { User } from '../entity/user';
import { Role } from '../entity/role';

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

  @Type(() => Array)
  @Transform(value => value.map(item => item.name))
  roles: Role[];
}
