import { NotFoundError } from 'routing-controllers';

import { excludeFields, NotFoundException } from '~/core';
import { DI } from '~/providers';

import type { MailService } from '../../core/providers/mail';
import type { CreateUserDto } from './dto';
import type { UserEntity } from './entities';
import type { UserRepository, UserService } from './user.interface';

export class UserServiceImpl implements UserService {
  private userRepository: UserRepository;

  private mailService: MailService;

  constructor() {
    this.userRepository = DI.instance.userRepository;
    this.mailService = DI.instance.mailService;
  }

  create(_createProfileDto: CreateUserDto) {
    return this.userRepository.create({});
  }

  async findById(id: string) {
    try {
      const user = await this.userRepository.findById(id);

      return excludeFields<UserEntity, keyof UserEntity>(user!, ['password']);
    } catch {
      throw new NotFoundError('not found');
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findUniqueBy({ email });
    if (!user)
      throw new NotFoundException('User', `Not found user with "${email}"`);

    return user;
  }

  async findByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findUniqueBy({ username });
    if (!user)
      throw new NotFoundException('User', `Not found user with "${username}"`);

    return user;
  }
}
