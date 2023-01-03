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
} from '@nestjs/common';

import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getProducts() {
    return this.productsService.findAll();
  }
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId') productId: string) {
    return this.productsService.findOne(+productId);
  }

  @Post()
  create(@Body() payload: any) {
    this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return id;
  }
}
