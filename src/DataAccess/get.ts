import { getManager } from "typeorm";

export function get<T>(type: new () => T, id: number) : Promise<T> {

    return getManager().getRepository(type).findOneOrFail(id)
    .then((item) => {
        return item;
    })
    .catch((error) => {
        console.log(error);
        return null;
    });
}