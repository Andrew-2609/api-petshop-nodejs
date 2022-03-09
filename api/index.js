const express = require('express');
const app = express();
const config = require('config');
const roteador = require('./rotas/fornecedores');
const FornecedorNaoEncontradoError = require('./erros/FornecedorNaoEncontradoError');
const CampoInvalidoError = require('./erros/CampoInvalidoError');
const DadosNaoFornecidosError = require('./erros/DadosNaoFornecidosError');
const ValorNaoSuportadoError = require('./erros/ValorNaoSuportadoError');
const {formatosAceitos} = require('./Serializador');

app.use(express.json());

app.use((req, res, next) => {
    let formatoRequisitado = req.header('Accept');

    if (formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json';
    }

    if (!formatosAceitos.includes(formatoRequisitado)) {
        res.status(406);
        res.end();
        return;
    }

    res.setHeader('Content-Type', formatoRequisitado);
    next();
});

app.use('/api/fornecedores', roteador);

app.use((erro, req, res, next) => {
    let codigoStatus = 500;

    codigoStatus = erro instanceof CampoInvalidoError || erro instanceof DadosNaoFornecidosError
        ? 400
        : codigoStatus
    ;
    codigoStatus = erro instanceof FornecedorNaoEncontradoError ? 404 : codigoStatus;
    codigoStatus = erro instanceof ValorNaoSuportadoError ? 406 : codigoStatus;

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