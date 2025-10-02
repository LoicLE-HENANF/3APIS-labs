import http from 'http';
import url from 'url';
import fs from 'fs';
import { readTodos, addTodo, deleteTodo, deleteAllTodos } from './todos/todoUtils.js';

const port = 3000;
const todoFile = 'todos/todo1.json';

// Routes definition
const routes = {
    '/': {
        GET: (req, res) => {
            fs.readFile('index.html', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    console.error(err);
                    res.end('500 Internal Server Error');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            });
        }
    },
    '/dist/output.css': {
        GET: (req, res) => {
            fs.readFile('dist/output.css', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    console.error(err);
                    res.end('404 Not Found');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            });
        }
    },
    '/todos/getAll': {
        GET: (req, res) => {
            const todos = readTodos(todoFile);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(todos, null, 2));
        }
    },
    '/todos': {
        GET: (req, res) => {
            fs.readFile('src/todos/todoIndex.html', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    console.error(err);
                    res.end('500 Internal Server Error');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            });
        }
    },
    '/todos/submit': {
        POST: (req, res) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const todo = new URLSearchParams(body).get('todo');
                addTodo(todoFile, todo);
                res.writeHead(302, { Location: '/todos' });
                res.end();
            });
        }
    },
    '/todos/delete': {
        POST: (req, res) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const todoIndex = parseInt(new URLSearchParams(body).get('index'));
                deleteTodo(todoFile, todoIndex);
                res.writeHead(302, { Location: '/todos' });
                res.end();
            });
        }
    },
    '/todos/deleteAll': {
        GET: (req, res) => {
            deleteAllTodos(todoFile);
            res.writeHead(302, { Location: '/todos' });
            res.end();
        }
    }
};

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const method = request.method;
    const route = routes[parsedUrl.pathname];

    if (route && route[method]) {
        route[method](request, response);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
