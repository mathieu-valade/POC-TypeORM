import "reflect-metadata";
import * as bodyParser from "body-parser"

import * as express from "express"
import { createConnection } from "typeorm";
import { BasicRepository } from "./Business/BasicRepository";
import { Country } from "./entity/Country";

import {configure} from "./route/Factory";
import {Verb} from "./route/Verb"




createConnection().then(async connection => {
}).catch(error => console.log(error));


const app = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

const router = configure(Country, "/country", [Verb.Get, Verb.GetAll, Verb.Post, Verb.Delete]);

app.use(router)


app.listen(3000, () => {
    console.log("listening")
});
