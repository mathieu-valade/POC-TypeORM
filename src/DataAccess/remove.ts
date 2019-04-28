import { getManager } from "typeorm";

export function remove<T>(type: new () => T, id: number) : Promise<Boolean> {

    return getManager().getRepository(type).delete(id)
    .then((item) => {
        return true;
    })
    .catch((error) => {
        console.log(error);
        return false;
    });
}