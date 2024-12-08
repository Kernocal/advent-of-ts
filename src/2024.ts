/* eslint-disable unused-imports/no-unused-vars, antfu/top-level-function */

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
