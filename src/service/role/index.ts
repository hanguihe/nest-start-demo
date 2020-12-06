import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '../../entity/role';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findRoleById(id: number) {
    return this.roleRepository.findOne(id);
  }

  findByIds(ids: number[]) {
    return this.roleRepository.findByIds(ids);
  }
}
