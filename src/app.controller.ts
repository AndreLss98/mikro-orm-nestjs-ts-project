import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(
    private readonly _appService: AppService
  ) {
  
  }

  @Get()
  async testApp() {
    return this._appService.getTest();
  }

}
