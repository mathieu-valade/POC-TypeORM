import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";
import {City} from "./City"

@Entity()
export class Traveler {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => City, city => city.travelers)
    @JoinTable()
    cities: City;
}