import { getClassName } from "../helper";
import { getManager } from "typeorm";


export function postMany<T1, T2>(oneType: new() => T1, manyType: new() => T2, item: T1) : Promise<Boolean> {
    const oneClassName = getClassName(oneType);
    const manyClassName = getClassName(manyType);

    if (item[manyClassName] != undefined) { 
        const itemList = item[manyClassName].map(i => getManager().getRepository(manyClassName).create(i));
        item[manyClassName] = itemList;
    }

    return getManager().getRepository(oneClassName)
    .save(item)
    .then(()=> {
        return true;
    })
    .catch((error) => {
        console.log(error);
        return false;
    })
}