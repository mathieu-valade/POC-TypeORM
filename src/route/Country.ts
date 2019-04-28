import {Router} from "express"

export const router  = Router();

router.get("/", (request, response) => response.status(200).json("test"))