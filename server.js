const express = require('express');
const app = express();
const routes = require('./controllers')
const db = require('./config/connection');

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(routes);

db.once('open', () => {
    app.listen(3001, () => {
        console.log('Server is running!')
    })
})