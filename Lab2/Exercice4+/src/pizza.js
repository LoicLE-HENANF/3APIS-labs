import {parseArgs} from "node:util";

const options = {
    base: {type: 'string', short: 'b'},
    size: {type: 'string', short: 's'},
    toping: {type:'string', short: 't'}
}


const obj = parseArgs({options})
console.log(obj)

function pizza (obj) {
    if(obj.values.base !== "tomate" && obj.values.base !== "creme") {
        console.error("Wrong base")
        return null;
    }

    if(obj.values.size !== "s" && obj.values.size !== "m" && obj.values.size !== "l") {
        console.error("Wrong size (s, m or l)")
        return null;
    }

    if(obj.values.toping.split(' ').length === 0) {
        console.error("Choose at list one toping")
        return null;
    }
    
    return "Pizza base: " + obj.values.base + " size: " + obj.values.size + " toping: " + obj.values.toping.split(' ')
}

console.log(pizza(obj) ?? "")