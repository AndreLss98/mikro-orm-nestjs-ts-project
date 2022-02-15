import { EntityRepository, wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";

import { BookEntity } from "../../entities/book.entity";
import { TagEntity } from "../../entities/tag.entity";
import { BaseService } from "../base.service";

import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Injectable()
export class TagsService extends BaseService<
  TagEntity,
  CreateTagDto,
  UpdateTagDto
> {
  constructor(
    @InjectRepository(TagEntity)
    private readonly _tagRepository: EntityRepository<TagEntity>,
    private readonly em: EntityManager
  ) {
    super();
  }

  async getAll(): Promise<TagEntity[]> {
    return this._tagRepository.findAll(["books"]);
  }

  async getById(id: number): Promise<TagEntity> {
    return this._tagRepository.findOne(
      { id },
      {
        fields: ["name"],
      }
    );
  }

  async create(dto: CreateTagDto): Promise<TagEntity> {
    const tag = this._tagRepository.create(dto);
    await this._tagRepository.persistAndFlush(tag);
    return tag;
  }

  async update(id: number, dto: UpdateTagDto): Promise<TagEntity> {
    const em = this.em.fork(false);
    await em.begin();

    try {
      const tag = await this._tagRepository.findOneOrFail({ id });

      if (dto.books) {
        await tag.books.init();

        for (let book of tag.books) {
          await book.tags.init();
          book.tags.remove(tag);
          em.persist(book);
        }

        tag.books.removeAll();

        dto.books.forEach((book) => {
          const ref = em.getReference(BookEntity, book.id);
          tag.books.add(ref);
        });

        delete dto.books;
      }

      const to_save = wrap(tag).assign(dto);
      em.persist(to_save);
      await em.commit();
      return to_save;
    } catch (e) {
      await em.rollback();
      throw e;
    }
  }
}
