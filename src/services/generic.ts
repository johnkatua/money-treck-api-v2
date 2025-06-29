import { Model } from "mongoose";

export class GenericService<T> {
    constructor (private model: Model<T>) {}

    
    checkDocExistance(doc: any) {
        const notFoundError = `${this.model.modelName} not found`
        if (!doc) throw new Error(notFoundError)
    }


    async create(data: Partial<T>) {
        return await this.model.create(data as any)
    }

    async findAll(sortBy: string = "-createdAt") {
        return this.model.find().sort(sortBy)
    }

    async findById(id: string) {
        const doc = await this.model.findById(id)
        this.checkDocExistance(doc)
        return doc;
    }

    async updateById(id: string, data: Partial<T>) {
        const updated = await this.model.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })
        this.checkDocExistance(updated)
        return updated;
    }

    async deleteById(id: string) {
        const result = await this.model.findByIdAndDelete(id);
        this.checkDocExistance(result)
        return {
            msg: `${this.model.modelName} deleted successfully`
        }
    }
}