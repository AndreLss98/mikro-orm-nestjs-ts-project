import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { TagEntity } from "../../entities/tag.entity";

import { BaseController } from "../base.controller";

import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { TagsService } from "./tags.service";

@Controller("tags")
export class TagsController extends BaseController<
  TagEntity,
  TagsService,
  CreateTagDto,
  UpdateTagDto
> {
  constructor(private readonly _tagsService: TagsService) {
    super(_tagsService);
  }
}
