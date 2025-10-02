import { fibonacci, add, divide } from './functions.js';
import {parseArgs} from "node:util";

const options = {
    foo: {type: 'boolean', short: 'f'},
    bar: {type: 'string', short: 'b'}
}

console.log("---- add ----");
console.log(add(45,2))

console.log("---- divide ----");
console.log(divide(1,4))

console.log("---- fibonacci of 10 ----");
console.log(fibonacci(10))

console.log("---- args ----");
const obj = parseArgs({options})
console.log(obj.values, obj.positionals)