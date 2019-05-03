import { getManager } from "typeorm";
import { getClassName } from "../helper";

export function getMany<T1, T2>(oneType: new() => T1, manyType: new() => T2, id: number): Promise<T2[]> {
    const oneClassName = getClassName(oneType);
    const manyClassName = getClassName(manyType);
    
    return getManager().getRepository(oneClassName)
    .findOneOrFail({relations: [manyClassName], where: {id: id}})
    .then((item) => {
        return item[manyClassName];
    })
    .catch((error) => {
        console.log(error);
        return null;
    })
}