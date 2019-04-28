import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import {Country} from "./Country"
import {Traveler} from "./Traveler"

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Country, country => country.cities)
    country: Country;

    @ManyToMany(type => Traveler, traveler => traveler.cities)
    @JoinTable()
    travelers: Traveler
}