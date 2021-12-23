import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly _tagsService: TagsService
    ) { }

    @Get()
    async getAll() {
        return this._tagsService.getAll();
    }

    @Get(':id')
    async getById(
        @Param('id')
        id: string
    ) {
        return this._tagsService.getById(id);
    }

    @Post()
    async create(@Body() body: CreateTagDto) {
        return this._tagsService.create(body);
    }

    @Patch(':id')
    async update(
        @Param('id')
        id: string,
        @Body()
        body: UpdateTagDto
    ) {
        return this._tagsService.update(id, body);
    }
}
