import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  async getTest() {
    const str: string = 'Api rodando...';
    return str;
  }
}
