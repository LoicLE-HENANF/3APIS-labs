export abstract class Service<T, ID = string> {
    abstract getAll(): Promise<T[]>;
    abstract getById(id: ID): Promise<T | null>;
    abstract add(data: Partial<T>): Promise<T | null>;
    abstract update(id: ID, data: Partial<T>): Promise<T | null>;
    abstract delete(id: ID): Promise<T | null>;
}