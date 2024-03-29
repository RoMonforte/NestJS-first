import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';

import { CreateBrandDto, UpdateBrandDto, FilterBrandsDto } from 'src/products/dtos/brands.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll(params?: FilterBrandsDto) {
    if (params) {
      const where: FindConditions<Brand> = {};
      const { limit, offset } = params;

      return this.brandRepo.find({
        where,
        take: limit,
        skip: offset,
      });
    }
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findOne(id, {
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand with id #${id} not found!`);
    }
    return brand;
  }

  async create(data: CreateBrandDto) {
    const isUsed = await this.brandRepo.find({ where: { name: data.name } });
    if (isUsed.length === 0) {
      const newBrand = this.brandRepo.create(data);
      return this.brandRepo.save(newBrand);
    }
    throw new NotAcceptableException(
      `Brand with name ${data.name} already exists`,
    );
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepo.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id #${id} not found!`);
    }
      this.brandRepo.merge(brand, changes);
      return this.brandRepo.save(brand);
  }

  async remove(id: number) {
    const brand = await this.brandRepo.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id #${id} not found!`);
    }
    this.brandRepo.delete(id);
    return {
      message: `Brand with id # ${id} deleted!`,
    };
  }
}
