import { Controller } from '@nestjs/common';
import { BookEntity } from '../../entities/book.entity';
import { BaseController } from '../base.controller';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController extends BaseController<BookEntity, BooksService, CreateBookDto, UpdateBookDto> {
    constructor(
        private readonly _bookService: BooksService
    ) {
        super(_bookService);
    }
}
