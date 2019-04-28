import {Verb} from "./Verb"
import {Router} from "express"
import { BasicRepository } from "../Business/BasicRepository";

export function configure<T>(type: new () => T, route: String, verbList: Verb[]) : Router {
    const router  = Router();
    const repository = new BasicRepository(type);

    verbList.forEach((verb) => {
        if (verb === Verb.GetAll) {
            router.get(route, (request, response) => {
                repository.getAll().then((list) => {
                    if (list === null) {
                        response.status(400).json("An Error Occured");
                    }
                    else {
                        response.status(200).json(list);
                    }
                })
            })
        }
        else if (verb === Verb.Get) {
            router.get(`${route}/:id`, (request, response) => {
                const id = request.params.id;
                repository.get(id).then((item) => {
                    if (item === null) {
                        response.status(400).json("An Error Occurred");
                    }
                    else {
                        response.status(200).json(item);
                    }
                })
        })

        }
        else if (verb === Verb.Post) {
            router.post(route, (request, response) => {
                const item = request.body;

                repository.post(item).then((isSuccess) => {
                    if (isSuccess === false) {
                        response.status(400).json("An Error Occurred");
                    }
                    else {
                        response.status(201).json("An Item Was Created");
                    }
                })

            })

        }
        else if (verb === Verb.Delete) {
            router.delete(`${route}/:id`, (request, response) => {
                const id = request.params.id;

                repository.delete(id).then((isSuccess) => {
                    if(isSuccess === false){
                        response.status(400).json("An Error Occurred");
                    }
                    else {
                        response.status(204).json("An Item Was Deleted");
                    }
                })
            }) 

        }
    })

    return router;

}