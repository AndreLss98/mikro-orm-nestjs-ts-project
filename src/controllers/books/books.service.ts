import { Injectable } from '@nestjs/common';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { BookEntity } from '../../entities/book.entity';
import { TagEntity } from '../../entities/tag.entity';
import { BaseService } from '../base.service';

@Injectable()
export class BooksService extends BaseService<BookEntity, CreateBookDto, UpdateBookDto> {
    constructor(
        @InjectRepository(BookEntity)
        private readonly _bookRepository: EntityRepository<BookEntity>,
        private readonly em: EntityManager,
    ) {
        super();
    }

    async getAll(): Promise<BookEntity[]> {
        return this._bookRepository.findAll(['tags']);
    }

    async getById(id: number): Promise<BookEntity> {
        return this._bookRepository.findOne({id}, {
            fields: ['title']
        });
    }

    async create(dto: CreateBookDto): Promise<BookEntity> {
        const em = this.em.fork(false);
        await em.begin();

        try {
            const book = this._bookRepository.create(dto);
            em.persist(book);
    
            await em.commit();
            return book;
        } catch (e) {
            em.rollback();
            throw e;
        }
    }

    async update(id: number, dto: UpdateBookDto) {
        const em = this.em.fork(false);
        await em.begin();

        try {
            const book = await this._bookRepository.findOneOrFail({id});

            if (dto.tags) {
                await book.tags.init();
                book.tags.removeAll();
                dto.tags.forEach(tag => {
                    const ref = em.getReference(TagEntity, tag.id);
                    book.tags.add(ref);
                });
                delete dto.tags;
            }

            const to_save = wrap(book).assign(dto);
            em.persist(to_save);
            await em.commit();
            return to_save;
        } catch(e) {
            await em.rollback();
            throw e;
        }
    }

}
