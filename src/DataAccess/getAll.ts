import { getManager } from "typeorm";

export function getAll<T>(type: new () => T) : Promise<T[]> {

    return getManager().getRepository(type).find()
    .then((list) => {
        return list;
    })
    .catch((error) => {
        console.log(error);
        return null;
    })
}