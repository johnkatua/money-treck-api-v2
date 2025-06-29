export abstract class BaseController<T> {
    constructor(protected readonly service: any) {}

    create() {}

    getAll() {}

    getById() {}

    updateById() {}

    deleteById() {}
}