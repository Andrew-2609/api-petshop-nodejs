const express = require('express');
const app = express();
const config = require('config');
const roteador = require('./rotas/fornecedores');
const { SerializadorErro, formatosAceitos } = require('./Serializador');

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

    res.setHeader('X-Powered-By', 'NdrewCoding');
    res.setHeader('Content-Type', formatoRequisitado);
    next();
});

app.use('/api/fornecedores', roteador);

app.use((erro, req, res, next) => {
    const serializador = new SerializadorErro(res.getHeader('Content-Type'));

    res.status(erro.status || 500);
    res.send(serializador.serializar({
        mensagem: erro.message,
        id: erro.idErro
    }));
    next();
});

app.listen(config.get('api.porta'), () => {
    console.log('Hallo, Welt!');
});