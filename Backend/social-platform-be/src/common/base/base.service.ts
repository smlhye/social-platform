import { BaseEntity, DeepPartial, DeleteResult, In, Repository } from "typeorm";
import { IBaseService } from "./i.base.service";
import { LoggerService, NotFoundException } from "@nestjs/common";

export class BaseService<T extends BaseEntity, R extends Repository<T>> implements IBaseService<T> {
    protected readonly repository: R;
    protected readonly logger: LoggerService;

    constructor(repository: R, logger: LoggerService) {
        this.repository = repository;
        this.logger = logger;
    }

    index(): Promise<T[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<T | null> {
        return await this.repository.findOne({ where: { id } as any });
    }

    async findByIds(ids: string[]): Promise<T[]> {
        return this.repository.find({ where: { id: In(ids) } as any });
    }

    store(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    async update(id: string, data: DeepPartial<T>): Promise<T> {
        const entity = await this.findById(id);
        if (!entity) {
            this.logger.warn(`Entity with ID ${id} not found for update`)
            throw new NotFoundException(`Entity with ID ${id} not found`);
        }
        Object.assign(entity, data);
        return this.repository.save(entity);
    }

    delete(id: string): Promise<DeleteResult> {
        return this.repository.delete(id)
    }
}