const roteador = require('express').Router();
const TabelaProduto = require('./TabelaProduto');

roteador.get('/', async (req, res) => {
    const produtos = await TabelaProduto.listar(req.params.idFornecedor);
    res.send(
        JSON.stringify(produtos)
    );
});

module.exports = roteador;