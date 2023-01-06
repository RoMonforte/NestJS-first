import { Injectable, NotFoundException, Inject } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

import { ProductsService } from 'src/products/services/products.service';


@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService,
    @Inject('API_KEY') private apiKey: string,) {}


  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      username: 'AdminGOD',
      password: '123',
      role: 'god',
    },
  ];

  findAll() {
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
