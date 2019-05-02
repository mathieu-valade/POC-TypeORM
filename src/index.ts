import "reflect-metadata";
import * as bodyParser from "body-parser"

import * as express from "express"
import { createConnection } from "typeorm";
import { Country } from "./entity/Country";

import {configureBasic} from "./route/BasicFactory";
import {Verb} from "./route/Verb"
import { configureOneToMany } from "./route/OneToManyFactory";
import { City } from "./entity/City";




createConnection().then(async connection => {
}).catch(error => console.log(error));


const app = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )


app.use(
  configureOneToMany(
    Country,
    City,
    [Verb.Get, Verb.GetAll, Verb.Post, Verb.Delete, Verb.GetMany]
));

//app.use(configureBasic(City, [Verb.Get, Verb.GetAll, Verb.Post, Verb.Delete, Verb.GetMany, Verb.PostMany]))

app.listen(3000, () => {
    console.log("listening")
});
