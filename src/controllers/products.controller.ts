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
  // ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from 'src/services/products.service';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getProducts() {
    return this.productsService.findAll();
  }
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    this.productsService.create(payload);
    return payload;

  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
