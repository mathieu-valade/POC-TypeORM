import { getManager } from "typeorm";

export function post<T>(type: new () => T, item : T) : Promise<Boolean> {
    console.log(item);
    return getManager().getRepository(type).save(item)
    .then(() => {
        return true;
    })
    .catch((error) => {
        console.log(error);
        return false;
    })
}