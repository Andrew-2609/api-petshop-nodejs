const express = require('express');
const app = express();
const config = require('config');
const roteador = require('./rotas/fornecedores');
const FornecedorNaoEncontradoError = require('./erros/FornecedorNaoEncontradoError');
const CampoInvalidoError = require('./erros/CampoInvalidoError');
const DadosNaoFornecidosError = require('./erros/DadosNaoFornecidosError');

app.use(express.json());

app.use('/api/fornecedores', roteador);

app.use((erro, req, res, next) => {
    let codigoStatus = 500;

    codigoStatus = erro instanceof FornecedorNaoEncontradoError ? 404 : codigoStatus;
    codigoStatus = erro instanceof CampoInvalidoError || erro instanceof DadosNaoFornecidosError
        ? 400
        : codigoStatus
    ;

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