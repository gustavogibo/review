const express = require('express');
const bodyParser = require('body-parser');

const { User } = require('./app/models');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

User.create({ name: 'Claudio', email: 'claudio@rocketseat.com.br', password: '123456' });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    User.findAndCountAll().then(result => {

        res.json(result.rows);

    })
}); //Listar todos

app.get('/users/:id', (req, res) => {
    User.findById(req.params("id")).then(user => {

        res.json(user);

    })
}); //Buscar
app.put('/users/:id', (req, res) => {}); //Editar
app.delete('/users/:id', (req, res) => {}); //Deletar

app.post('/register', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

app.listen(3000);