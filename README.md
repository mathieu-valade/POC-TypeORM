# Proof of Concept - Express x TypeORM x Repository

## Description

This project has for goal to display an implementation of the Repository design pattern in Typescript, along with an API to access it.  
It aims to be a prototype to automatize route creation, and doesn't aim to be a full foulproof implementation.

## Configure

Change the following if necessary:

ormconfig.json
```json
{
   "host": "localhost",
   "port": 5432,
   "username": "postgres",
   "database": "techjourney"
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
- Cascade can be only present on one side of the relation to avoid circular references (See example in `./entity` folder).


To setup the routes, use the `BasicFactory` or the `RelationFactory`. The routes will have the name of the classes (eg: Class City => /city). The Factories' constructor take in a list of verb that you want to implement in your API.

### Basic Factory

- `GET /class` Get all elements of type basic
- `GET /class/id` Get element by id
- `POST /class` Create an element
- `DEL /class/id` Delete element by id

### Relation Factory

- `GET /class1/id/class2` Get all element of class2 that have a relation with the element by id of class1.
- `POST /class1/class2` Create or update an element of class1 containing a list of element of class2

## Run the API

1. Run `npm i` command
2. Run `npm start` command