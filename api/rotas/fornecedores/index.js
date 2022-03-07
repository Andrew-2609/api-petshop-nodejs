const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar();
    res.send(JSON.stringify(resultados));
});

module.exports = roteador;