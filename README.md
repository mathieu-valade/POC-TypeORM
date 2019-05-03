# Proof of Concept - Express x TypeORM x Repository

## Description

This project has for goal to display an implementation of the Repository design pattern in Typescript, along with an API to access it.

## Configure

Change the following if necessary

ormconfig.json
```json
{
   "host": "localhost",
   "port": 5432,
   "username": "postgres",
   "database": "techjourney",
   ...
}
```

The project still requires the user to configure the TypeORM EntitySchema himself. Furthermore, it must follow some rules in order to work properly.

```typescript
@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Country, country => country.city)
    country: Country;

    @ManyToMany(type => Traveler, traveler => traveler.city, {"cascade": true})
    @JoinTable()
    traveler: Traveler[]
}
```

- The class must have an `id` field with the `@PrimaryGeneratedColumn()` attribute.
- The class can have any other column, see the [TypeORM Documentation](https://typeorm.io/#/) for further information.
- Any relation with an other class must be represented by a field of the same name as lowercase (eg: see above.)
- Cascade can be only present on one side of the relation to avoid circular references (See examples below).


## Run the API

1. Run `npm i` command
2. Run `npm start` command