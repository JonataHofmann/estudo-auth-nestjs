import User from '../user/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { Mock } from 'test/mock/mock';
import { Repository } from 'typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService, Repository<User>],
      // providers: [
      //   {
      //     provide: UserService,
      //     useValue: {
      //       findAll: jest.fn(() => Mock.user.list),
      //     },
      //   },
      // ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should get list user', () => {});
});
