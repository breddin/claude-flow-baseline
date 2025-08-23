
const express = require('express');
const app = express();

app.use(express.json());

const users = [];

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  const user = { id: users.length + 1, name, email };
  users.push(user);
  res.status(201).json(user);
});

module.exports = app;
