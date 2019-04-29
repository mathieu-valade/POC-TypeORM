import {Router} from "express"
import { configureBasic } from "./BasicFactory";
import { OneToManyRepository } from "../Business/OneToManyRepository";
import { Verb } from "./Verb";


export function configureOneToMany<T1, T2>(oneType: new() => T1, manyType: new() => T2, verbList: Verb[]) : Router {
    const router = Router();
    router.use(configureBasic(oneType, verbList));
    
    const repository = new OneToManyRepository(oneType, manyType);
    const oneRoute = repository.className;
    const manyRoute = repository.manyClassName;

    verbList.forEach((verb) => {
        if (verb === Verb.GetMany) {
            router.get(`/${oneRoute}/:id/${manyRoute}`, (request, response) => {
                const id = request.params.id;
                repository.getMany(id).then((list) => {
                    if (list === null) {
                        response.status(400).json("An Error Occurred");
                    }
                    else {
                        response.status(200).json(list);
                    }
                })
            })
        }
    })

    return router;
}