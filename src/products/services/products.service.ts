import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';
import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>,) {

  }

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: any) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found!`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    return this.productRepo.save(newProduct);
  }

  async update(id: any, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found!`);
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }
 async remove(id: any) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found!`);
    }
    this.productRepo.delete(id)
    return {
      message: `Product with id # ${id} deleted!`
    }

  }
}
