/* eslint-disable unused-imports/no-unused-vars, antfu/top-level-function, ts/no-namespace, ts/prefer-literal-enum-member */
import { } from './santas-special-list'

// Day 1 - Primitives
type Demand1 = number

// Day 2 - Literals
type Demand2 = 900_000

// Day 3 - Type function parameter
const survivalRatio1 = (input: number) => { /* blah */ }

// Day 4 - Union type
const survivalRatio2 = (input: number | string) => { /* blah */ }

// Day 5 - Type function output as input literal
const createRoute1 = <T>(author: string, route: T) => (route)

// Day 6 - Day 5 but union
const createRoute2 = <T extends string | number>(author: string, route: T) => (route)

// Day 7 - infer array to get literal type -> 1) spread array into tuple or 2) from ts ^5.0 use const in generics
const createRoute3 = <T extends string[]>(author: any, route: [...T]) => ({ route })
const createRoute4 = <const T extends string[]>(author: any, route: T) => ({ route })

// Day 8 - extend global
declare namespace NodeJS {
    interface ProcessEnv {
        MOOD_LIGHTS: 'true'
        BATH_TEMPERATURE: '327.59'
        STRAWBERRIES: 'chocolate'
    }
}

// Day 9 - type module
declare module './santas-special-list' {
    type Status = 'naughty' | 'nice'
    interface Child {
        name: string
        status: Status
    }
    type List = Child[]
}

// Day 10 - Enums bitwise (good to read https://typescript-eslint.io/rules/prefer-literal-enum-member/)
enum Gift {
    // unique
    Coal = 0,
    Train = 1,
    Bicycle = Train << 1,
    SuccessorToTheNintendoSwitch = Bicycle << 1,
    TikTokPremium = SuccessorToTheNintendoSwitch << 1,
    Vape = TikTokPremium << 1,

    // combo
    Traditional = (Train | Bicycle),
    OnTheMove = (Coal | Bicycle | TikTokPremium | Vape),
    OnTheCouch = ((Coal | TikTokPremium | Vape) & ~Bicycle | SuccessorToTheNintendoSwitch),
};

// helpers
type Omit<T, U> = T extends U ? never : T
type Push<T extends any[], U> = [...T, U]
type Pick<T, U extends keyof T> = {
    [K in U]: T[K];
}

// playground
interface Person { name: string, age: number }

type TransformedPerson = {
    [K in keyof Person as `new_${K}` | `updated_${K}` | `changed_${K}`]: Person[K];
}
