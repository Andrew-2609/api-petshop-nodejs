const roteador = require('express').Router({mergeParams: true});
const TabelaProduto = require('./TabelaProduto');
const Produto = require('./Produto');

roteador.get('/', async (req, res) => {
    const produtos = await TabelaProduto.listar(req.params['idFornecedor']);
    res.status(200);
    res.send(
        JSON.stringify(produtos)
    );
});

roteador.post('/', async (req, res) => {
    const idFornecedor = req.params['idFornecedor'];
    const corpo = req.body;
    const dados = Object.assign({}, corpo, {idFornecedor: idFornecedor});
    const produto = new Produto(dados);
    await produto.criar();
    res.status(201);
    res.send(JSON.stringify(produto));
});

module.exports = roteador;