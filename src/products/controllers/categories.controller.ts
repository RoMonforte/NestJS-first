import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoriesService } from 'src/products/services/categories.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/categories.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';



@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('products')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Public()
  @Get()
  getProducts() {
    return this.categoriesService.findAll();
  }

  @Public()
  @Get(':categoryId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.findOne(categoryId);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(+id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
