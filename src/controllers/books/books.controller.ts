import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
    constructor(
        private readonly _bookService: BooksService
    ) { }

    @Get()
    async getAll() {
        return await this._bookService.getAll();
    }

    @Get(':id')
    async getById(
        @Param('id')
        id: string
    ) {
        return await this._bookService.getById(id);
    }

    @Post()
    async create(@Body() body: CreateBookDto) {
        return this._bookService.create(body);
    }

    @Patch(':id')
    async update(
        @Param('id')
        id: string,
        @Body()
        body: UpdateBookDto
    ) {
        return this._bookService.update(id, body);
    }
}
