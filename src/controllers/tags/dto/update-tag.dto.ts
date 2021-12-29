import { BookEntity } from "../../../entities/book.entity";

export class UpdateTagDto {
    name: string;
    books: BookEntity[];
}