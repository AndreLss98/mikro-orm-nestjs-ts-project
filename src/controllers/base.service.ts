export abstract class BaseService<Entity, CreateDto, UpdateDto> {
    abstract getAll(): Promise<Entity[]>;
    abstract getById(id: number): Promise<Entity>;
    abstract create(body: CreateDto): Promise<Entity>;
    abstract update(id: number, body: UpdateDto): Promise<Entity>;
}