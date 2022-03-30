const express = require('express');
const app = express();
const config = require('config');
const roteador = require('./rotas/fornecedores');
const FornecedorNaoEncontradoError = require('./erros/FornecedorNaoEncontradoError');
const CampoInvalidoError = require('./erros/CampoInvalidoError');
const DadosNaoFornecidosError = require('./erros/DadosNaoFornecidosError');
const ValorNaoSuportadoError = require('./erros/ValorNaoSuportadoError');
const {SerializadorErro, formatosAceitos} = require('./Serializador');
const EstoqueAbaixoDeZeroError = require('./erros/EstoqueAbaixoDeZeroError.js');

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

    codigoStatus = erro instanceof CampoInvalidoError || erro instanceof DadosNaoFornecidosError || erro instanceof EstoqueAbaixoDeZeroError
        ? 400
        : codigoStatus
    ;
    codigoStatus = erro instanceof FornecedorNaoEncontradoError ? 404 : codigoStatus;
    codigoStatus = erro instanceof ValorNaoSuportadoError ? 406 : codigoStatus;

    const serializador = new SerializadorErro(res.getHeader('Content-Type'));

    res.status(codigoStatus);
    res.send(serializador.serializar({
        mensagem: erro.message,
        id: erro.idErro
    }));
    next();
});

app.listen(config.get('api.porta'), () => {
    console.log('Hallo, Welt!');
});