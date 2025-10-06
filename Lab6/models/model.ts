export abstract class Model<T, ID = string> {
    abstract getAll(): Promise<T[]>;
    abstract getById(id: ID): Promise<T>;
    abstract add(entity: T): Promise<T>;
    abstract update(id: ID, data: Partial<T>): Promise<T>;
    abstract delete(id: ID): Promise<T>;
}