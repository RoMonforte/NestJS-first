import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';

import { Product } from './../entities/product.entity';
import { BrandsService } from './brands.service';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    private brandsService: BrandsService,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found!`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const isUsed = await this.productRepo.find({ where: { name: data.name } });
    if (isUsed.length === 0) {
      const newProduct = this.productRepo.create(data);
      if (data.brandId) {
        const brand = await this.brandRepo.findOne(data.brandId);
        newProduct.brand = brand;
      }
      if (data.categoriesId) {
        const categories = await this.categoryRepo.findByIds(data.categoriesId);
        newProduct.categories = categories;
      }
      return this.productRepo.save(newProduct);
    }
    throw new NotAcceptableException(
      `Product with name ${data.name} already exists`,
    );
  }

  async update(id: any, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found!`);
    }
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne(changes.brandId);
      product.brand = brand;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async remove(id: any) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found!`);
    }
    this.productRepo.delete(id);
    return {
      message: `Product with id # ${id} deleted!`,
    };
  }
}
