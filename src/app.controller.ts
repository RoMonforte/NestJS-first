import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';



@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();

  }

  @Get('nuevo')
  @Public()
  @SetMetadata('isPublic', true)
  newEndpoint() {
    return 'yo soy nuevoaaaasssssss';
  }

  @Get('tasks')
  tasks () {
    return 'hola';
  }
}
