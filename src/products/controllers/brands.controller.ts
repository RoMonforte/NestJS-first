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
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { BrandsService } from 'src/products/services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  @ApiOperation({summary: 'List of all brands in the API'})
  getUsers() {
    return this.brandsService.findAll();
  }
  @Get(':brandId')
  @HttpCode(HttpStatus.ACCEPTED)
  getUser(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandsService.findOne(brandId);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);

  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateBrandDto) {
    return this.brandsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
