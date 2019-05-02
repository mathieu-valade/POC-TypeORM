import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {City} from "./City"

@Entity()
export class Country{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => City, city => city.country, {"cascade": true})
    city: City;
}