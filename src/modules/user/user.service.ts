import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from 'routing-controllers';

import { ErrorCode } from '~/enums';
import { HttpException } from '~/exceptions';
import { DI } from '~/providers';
import type { PaginationOptions } from '~/types';
import { excludeFields } from '~/utils';

import type { MailService } from '../mail';
import type { CreateUserDto, UpdateUserDto } from './dto';
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

  findManyWithPagination(paginationOptions: PaginationOptions) {
    return this.userRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async findById(id: string) {
    try {
      const user = await this.userRepository.findOneById(id);

      return excludeFields<UserEntity, keyof UserEntity>(user!, ['password']);
    } catch {
      throw new NotFoundError('not found');
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.userRepository.findOneBy({ email });

      return user;
    } catch {
      throw new HttpException(StatusCodes.NOT_FOUND, [
        {
          code: ErrorCode.NOT_FOUND,
          key: 'User',
          message: `Not found user with ${email}`,
        },
      ]);
    }
  }

  update(id: string, updateProfileDto: UpdateUserDto) {
    return this.userRepository.update(id, updateProfileDto);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
