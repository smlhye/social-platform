export interface BaseRepository<T, Tid> {
    findById(id: Tid): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(entity: T): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T>;
    delete(id: Tid): Promise<void>;
}