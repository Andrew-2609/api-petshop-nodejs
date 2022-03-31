const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const { SerializadorFornecedor } = require('../../Serializador');

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar();

    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'), ['empresa']);

    res.status(200);
    res.send(serializador.serializar(resultados));
});

module.exports = roteador;