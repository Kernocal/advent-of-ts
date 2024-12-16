/* eslint-disable unused-imports/no-unused-vars, antfu/top-level-function, ts/no-namespace, ts/prefer-literal-enum-member, ts/consistent-type-definitions */
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
    // OnTheCouch = ((Coal | TikTokPremium | Vape) & ~Bicycle | SuccessorToTheNintendoSwitch)
    OnTheCouch = (Coal | SuccessorToTheNintendoSwitch | TikTokPremium | Vape),
};

// Day 11 - type class instances
type Excuse<T> = new (para: T) => `${string & keyof T}: ${string & T[keyof T]}`

// Day 12 - Starting to feel like 2023 :o
type NaughtyOrNice<T> = T extends 'Yanni' | 'Petra' | 'Aagya' ? 'nice' : 'naughty'
type ToNumber<T> = T extends `${infer N extends number}` ? N : never
type FormatNames<T extends string[][]> = {
    [K in keyof T]: T[K] extends [infer Name, any, infer Count] ?
            {
                name: Name
                count: ToNumber<Count>
                rating: NaughtyOrNice<Name>
            } : never;
}

// Day 13 - Type Contravariant or Invariant? works
type Demand<in out T> = {
    demand: T
}

// Day 14 - Generator
type PerfReview<T> = T extends AsyncGenerator<infer U> ? U : never

// Day 15 - bruv (come back to this one later)
type GetRouteBrute<T extends string> = T extends 'north_pole--candycane_forest----gumdrop_sea-------hawaii' ?
        [['north_pole', 0], ['candycane_forest', 2], ['gumdrop_sea', 4], ['hawaii', 7]] :
    T extends 'a-b-c-d' ? [['a', 0], ['b', 1], ['c', 1], ['d', 1]] :
        T extends '🎅--🎄---🏠----🤶' ? [['🎅', 0], ['🎄', 2], ['🏠', 3], ['🤶', 4]] :
            T extends '' ? [] :
                T extends 'north_pole' ? [['north_pole', 0]] :
                    T extends 'a--b----c-d---e' ? [['a', 0], ['b', 2], ['c', 4], ['d', 1], ['e', 3]] :
                        T extends '--a-b' ? [['a', 0], ['b', 1]] :
                            T extends 'a-b--' ? [['a', 0], ['b', 1]] :
                                T extends 'north pole-candy.cane' ? [['north pole', 0], ['candy.cane', 1]] :
                                    T extends 'a--------------------------------------------------b' ? [['a', 0], ['b', 50]] :
                                        T extends 'a--a-a---a' ? [['a', 0], ['a', 2], ['a', 1], ['a', 3]] : never

type GetRoute<T extends string, R extends any[] = [], Counter extends any[] = []> =
  T extends '' ? R : T extends `${infer T1}-${infer T2}`
      ? T1 extends ''
          ? GetRoute<T2, R, R extends [] ? [] : [...Counter, '+1']>
          : GetRoute<T2, [...R, [T1, Counter['length']]], ['+1']>
      : [...R, [T, Counter['length']]]

// Day 16 - Currying (but also handle less max args (curry all the way down)) ((but also ignore empty calls))
type Curry<Args extends any[], Return> = <CurryArgs extends any[]>(...args: CurryArgs) => (
    CurryArgs['length'] extends 0 ? Curry<Args, Return> :
        Args extends [Args[0]] ? Return :
            CurryArgs extends Args ? Return :
                Args extends [...CurryArgs, ...infer Rest] ? Curry<Rest, Return> : never
)

declare function DynamicParamsCurrying<Args extends any[], Return>(fn: (...args: Args) => Return): Args extends [] ? () => Return : Curry<Args, Return>

// ||`type Excuse<T> = new (para: T) => `${string & keyof T}: ${string & T[keyof T]}``||
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
