import { parseArgs } from "node:util";
import * as todoUtils from "./todoUtils.js"

// Define CLI options
const options = {
    file: { type: 'string', short: 'f' },
    action: { type: 'string', short: 'a' },
    todo: { type: 'string', short: 't' }
};

const obj = parseArgs({ options });

const { 
    file, 
    action, 
    todo 
} = obj.values;

if (!file || !action) {
    console.log("Please provide a file path (-f) and an action (-a).");
    process.exit(1);
}

// actions based on the 'action' argument
switch (action) {
    case 'add':
        if (!todo) {
            console.log("Please provide a todo to add (-t).");
        } else {
            todoUtils.addTodo(file, todo);
        }
        break;
    case 'read':
        todoUtils.readAllTodos(file);
        break;
    case 'delete':
        if (!todo || isNaN(todo)) {
            console.log("Please provide a valid todo number to delete (-t).");
        } else {
            const todoIndex = parseInt(todo);
            todoUtils.deleteTodo(file, todoIndex);
        }
        break;
    case 'deleteAll':
        todoUtils.deleteAllTodos(file);
        break;
    default:
        console.log("Unknown action. Use 'add', 'read', 'delete', or 'deleteAll'.");
        break;
}


// exemples
// node todo.js -f todos/todo1.json -a add -t "gefv<sdve"
// node todo.js -f todos/todo1.json -a add -t "zahbdazbdhbaz"

// node todo.js -f todos/todo1.json -a read

// node todo.js -f todos/todo1.json -a delete -t 1

// node todo.js -f todos/todo1.json -a deleteAll

// to populate the file

// node todo.js -f todos/todo1.json -a add -t "Buy groceries";
// node todo.js -f todos/todo1.json -a add -t "Walk the dog";
// node todo.js -f todos/todo1.json -a add -t "Finish project report";
// node todo.js -f todos/todo1.json -a add -t "Call Mom";
// node todo.js -f todos/todo1.json -a add -t "Read a book";
// node todo.js -f todos/todo1.json -a add -t "Prepare for the upcoming conference";
// node todo.js -f todos/todo1.json -a add -t "Exercise for 30 minutes";
// node todo.js -f todos/todo1.json -a add -t "Plan a weekend trip";
// node todo.js -f todos/todo1.json -a add -t "Organize workspace";