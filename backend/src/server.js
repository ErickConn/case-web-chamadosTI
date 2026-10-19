import express from 'express';

const router = require('./routes/routes.js');
const app = express();
app.use(router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log("Servidor Rodando!");
});