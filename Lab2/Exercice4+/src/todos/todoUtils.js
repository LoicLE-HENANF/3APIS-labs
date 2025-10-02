import fs from "node:fs";

export const readTodos = (file) => {
    try {
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

export const writeTodos = (file, todos) => {
    fs.writeFileSync(file, JSON.stringify(todos, null, 2));
};

export const addTodo = (file, newTodo) => {
    const todos = readTodos(file);
    todos.push(newTodo);
    writeTodos(file, todos);
    console.log("Todo added:", newTodo);
};

export const readAllTodos = (file) => {
    const todos = readTodos(file);
    if (todos.length === 0) {
        console.log("No todos found.");
    } else {
        console.log("Todos:");
        todos.forEach((todo, index) => {
            console.log(`${index + 1}. ${todo}`);
        });
    }
};

export const deleteTodo = (file, todoIndex) => {
    let todos = readTodos(file);

    if (typeof todoIndex !== 'number' || isNaN(todoIndex)) {
        console.log(`Invalid index: ${todoIndex}. Please provide a valid number.`);
        return;
    }

    if (todoIndex < 1 || todoIndex > todos.length) {
        console.log(`Todo number ${todoIndex} not found.`);
        return;
    }

    const deletedTodo = todos.splice(todoIndex - 1, 1);
    writeTodos(file, todos);

    console.log(`Todo "${deletedTodo}" deleted.`);
};

export const deleteAllTodos = (file) => {
    writeTodos(file, []);
    console.log("All todos deleted.");
};


