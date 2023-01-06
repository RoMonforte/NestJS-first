import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';

import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

import { ProductsService } from 'src/products/services/products.service';


@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}


  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      username: 'AdminGODass',
      password: '1111',
      role: 'goaaad',
    },
  ];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey,dbName);
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found!`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...user,
        ...payload,
      };
      return this.users[index];
    }
    return null;
  }
  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id #${id} not found!`);
    }
    this.users.splice(index, 1);
    return true;
  }
  findOneOrder(id: number) : Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll()

    }
  }
}
