const express = require('express');
const app = express()

// connection to the database
const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '',
    database: 'todo_app',
  },
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/api/todos', async (req, res) => {
  const todos = await knex.raw('SELECT * FROM todos ORDER BY id')
  const todo_row = todos.rows
  res.json(todo_row)
})

app.post('/api/todos', (req, res) => {
  const { description } = req.body
  let status = "active"
  const postSql = `INSERT INTO todos (description, status, user_id) VALUES (?, ?, ?)`
  knex.raw(postSql, [description, status, 1]).then((result => {
    res.json(result.rows)
  }))
})

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params
  const deleteSql = `DELETE FROM todos WHERE id = ?`
  knex.raw(deleteSql, [id]).then((result => {
    res.json(result.rows)
  }))
})

app.patch('/api/todos/:id', (req, res) => {
  const id = req.params.id
  const { status } = req.body
  const patchSql = `UPDATE todos SET status = ? WHERE id = ?`
  knex.raw(patchSql, [status, id]).then((result => {
    res.json(result.rows)
  }))
})

app.listen(3001, (req, res) => {
  console.log("listening on port 3001")
})

