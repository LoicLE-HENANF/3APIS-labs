import {parseArgs} from "node:util";
import {add, divide, multiply} from "./functions.js";

const options = {
    operation: {type: 'string', short: 'o'},
    input: {type: 'string', short: 'i'}
}

const obj = parseArgs({options})
console.log(obj)

function calculator (obj) {
    let result = 0;

    if (obj.values.operation === 'add'){
        for (let value of obj.values.input.split(' ').map(parseFloat)){
            result = add(result, value)
        }
    }
    else if (obj.values.operation === 'divide'){
        let values = obj.values.input.split(' ').map(parseFloat);

        if (values.length > 2){
            console.log("Please only provide 2 values, " + values.length + " given.")
            return null;
        }

        try {
            result = divide(values[0], values[1])
        }
        catch (e) {
            console.log("Error, " + e )
        }
    }
    else if (obj.values.operation === 'multiply') {
        result = 1;
        for (let value of obj.values.input.split(' ').map(parseFloat)){
            result = multiply(result, value)
        }
    }
    
    return result;
}

console.log("---- result ----");
console.log(calculator(obj) ?? "")
