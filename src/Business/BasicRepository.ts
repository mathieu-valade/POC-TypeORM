import { getAll } from "../DataAccess/getAll";
import { get } from "../DataAccess/get";
import { post } from "../DataAccess/post";
import { remove } from "../DataAccess/remove";

export class BasicRepository<T> {
    private type : new () => T;

    constructor(type : new () => T) {
        this.type = type;
    }

    public async getAll(): Promise<T[]> {
        return await getAll(this.type);
    }

    public async get(id: number): Promise<T> {
        return await get(this.type, id);
    }

    public async post(item : T): Promise<Boolean> {
        return await post(this.type, item);
    }

    public async delete(id: number): Promise<Boolean> {
        return await remove(this.type, id);
    }
}