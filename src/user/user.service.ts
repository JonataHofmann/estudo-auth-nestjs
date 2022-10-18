import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find({});
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) throw new EntityNotFoundError(User, id);
    return user;
  }
  async findOneByEmailAndPassword(email: string, password: string) {
    const logger = new Logger();

    logger.log(email, password);
    const user = await this.usersRepository.findOne({
      where: { email, password },
    });

    return user;
  }
  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateResult = await this.usersRepository.update(id, updateUserDto);
    if (!updateResult.affected) {
      throw new EntityNotFoundError(User, id);
    }
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string) {
    const deleteResult = await this.usersRepository.delete(id);
    if (!deleteResult.affected) throw new EntityNotFoundError(User, id);
  }
}
