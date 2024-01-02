import express from "express"
import cors from "cors"
const app = express()

app.use(cors());
app.use(express.json())

const todoList = [];

app.get('/', (req, res) => { 
    res.send('Serwer działa')
})

app.post('/todos', (req, res) => {
    todoList.push(req.body);
    res.status(200).end();
})

app.get('/todos', (req, res)=>{
    res.json({ todoList })
})

app.delete('/todos/:todoId', (req, res) => {
    const todoId = parseInt(req.params.todoId, 10);
    const todoItemIndex = todoList.findIndex((e) => e.id === todoId);

    if (todoItemIndex !== undefined) {
        todoList.splice(todoItemIndex, 1)
        res.status(200).end();
    } else {
        res.status(404).end()
    }
})


app.patch('/todos/:todoId', (req, res) => {
    const todoId = parseInt(req.params.todoId, 10);
    const todoItem = todoList.findIndex(e => e.id === todoId);

    if (todoItem !== undefined) {
        todoList[todoItem] = { ...todoList[todoItem], ...req.body };
        res.json({ todoList });
    } else {
        res.status(404).end();
    }
});


app.listen(8888, ()=>{
    console.log('Aplikacja wystartowała na porcie 8888');
})


