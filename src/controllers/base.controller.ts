import { Body, Get, Param, Patch, Post } from "@nestjs/common";
import { BaseService } from "./base.service";

export abstract class BaseController<
  Entity,
  Service extends BaseService<Entity, CreateDto, UpdateDto>,
  CreateDto,
  UpdateDto
> {
  constructor(private readonly _service: Service) {}

  @Get()
  getAll(): Promise<Entity[]> {
    return this._service.getAll();
  }

  @Get(":id")
  async getById(
    @Param("id")
    id: string
  ): Promise<Entity> {
    return this._service.getById(id);
  }

  @Post()
  async create(@Body() body: CreateDto): Promise<Entity> {
    return this._service.create(body);
  }

  @Patch(":id")
  async update(
    @Param("id")
    id: string,
    @Body()
    body: UpdateDto
  ): Promise<Entity> {
    return this._service.update(id, body);
  }
}
