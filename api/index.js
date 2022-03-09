const express = require('express');
const app = express();
const config = require('config');
const roteador = require('./rotas/fornecedores');
const FornecedorNaoEncontradoError = require('./erros/FornecedorNaoEncontradoError');

app.use(express.json());

app.use('/api/fornecedores', roteador);

app.use((erro, req, res, next) => {
    erro instanceof FornecedorNaoEncontradoError ? res.status(404) : res.status(400);
    res.send(JSON.stringify({
        mensagem: erro.message,
        id: erro.idErro
    }));
    next();
});

app.listen(config.get('api.porta'), () => {
    console.log('Hallo, Welt!');
});