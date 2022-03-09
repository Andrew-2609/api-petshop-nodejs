const express = require('express');
const app = express();
const config = require('config');
const roteador = require('./rotas/fornecedores');
const FornecedorNaoEncontradoError = require('./erros/FornecedorNaoEncontradoError');
const CampoInvalidoError = require('./erros/CampoInvalidoError');

app.use(express.json());

app.use('/api/fornecedores', roteador);

app.use((erro, req, res, next) => {
    let codigoStatus;

    codigoStatus = erro instanceof FornecedorNaoEncontradoError ? 404 : 400;
    codigoStatus = erro instanceof CampoInvalidoError ? 400 : codigoStatus;

    res.status(codigoStatus);
    res.send(JSON.stringify({
        mensagem: erro.message,
        id: erro.idErro
    }));
    next();
});

app.listen(config.get('api.porta'), () => {
    console.log('Hallo, Welt!');
});