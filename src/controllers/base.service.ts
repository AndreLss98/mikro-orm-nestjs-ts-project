export abstract class BaseService<Entity, CreateDto, UpdateDto> {
    abstract getAll(): Promise<Entity[]>;
    abstract getById(id: string): Promise<Entity>;
    abstract create(body: CreateDto): Promise<Entity>;
    abstract update(id: string, body: UpdateDto): Promise<Entity>;
}