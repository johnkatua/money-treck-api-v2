import { Document, Model } from "mongoose";
import { NotFoundError } from "../utils/exceptions/not_found";

export abstract class GenericService<T extends Document> {
    constructor (protected readonly model: Model<T>) {}


    protected async ensureExists(id: string): Promise<void> {
        const exists = await this.model.findById(id).exec();
        if (!exists) {
            throw new NotFoundError(`${this.model.modelName} with ID ${id} not found`)
        }
    }


    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data)
    }

    async findAll(sortBy: string = "-createdAt"): Promise<T[]> {
        return this.model.find().sort(sortBy).exec()
    }

    async findById(id: string): Promise<T | null> {
        await this.ensureExists(id)
        return await this.model.findById(id).exec()
    }

    async updateById(id: string, data: Partial<T>): Promise<T | null> {
        await this.ensureExists(id);
        return await this.model.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        }).exec()
    }

    async deleteById(id: string): Promise<{ msg: string }> {
        await this.ensureExists(id)
        await this.model.findByIdAndDelete(id);
        return {
            msg: `${this.model.modelName} deleted successfully`
        }
    }
}