// filepath: g:\DEV\nest-crud-next\backend\src\app.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getVersion(): string {
    const version = '1.0.0';
    return `API version ${version} running`;
  }
}
