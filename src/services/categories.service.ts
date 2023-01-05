import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/categories.dto';
import { Category } from './../entities/category.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
      description: 'blabla',
      image: 'url',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`Category with id #${id} not found!`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    if (category) {
      const index = this.categories.findIndex((item) => item.id === id);
      this.categories[index] = {
        ...category,
        ...payload,
      };
      return this.categories[index];
    }
    return null;
  }
  remove(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category with id #${id} not found!`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}