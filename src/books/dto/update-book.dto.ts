import { TagEntity } from "../../entities/tag.entity";

export class UpdateBookDto {
    title: string;
    releaseDate: Date;
    tags: TagEntity[];
}