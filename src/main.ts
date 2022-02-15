import "./env-loader";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MikroORM } from "@mikro-orm/core";
import { INestApplication } from "@nestjs/common";

export class AppController {
  app: Promise<INestApplication>;
  constructor() {
    this.app = NestFactory.create(AppModule);
    this._start();
  }

  private async _start() {
    await MikroORM.init();
    this.app.then(app => {
      const migrator = app.get(MikroORM).getMigrator();
      migrator.up();
    });
  }
}