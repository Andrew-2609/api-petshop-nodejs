const roteador = require('express').Router({ mergeParams: true });
const TabelaProduto = require('./TabelaProduto');
const Produto = require('./Produto');
const { SerializadorProduto } = require('../../../Serializador.js');

roteador.get('/', async (req, res) => {
    const produtos = await TabelaProduto.listar(req.fornecedor.id);

    const serializador = new SerializadorProduto(res.getHeader('Content-Type'));

    res.status(200);
    res.send(serializador.serializar(produtos));
});

roteador.get('/:idProduto', async (req, res, next) => {
    const idProduto = req.params['idProduto'];
    const produto = new Produto({ id: idProduto });

    try {
        await produto.carregar();

        const serializador = new SerializadorProduto(res.getHeader('Content-Type'));

        res.status(200);
        res.send(serializador.serializar(produto));
    } catch (erro) {
        next(erro);
    }
});

roteador.post('/', async (req, res, next) => {
    try {
        const idFornecedor = req.fornecedor.id;
        const corpo = req.body;
        const dados = Object.assign({}, corpo, { idFornecedor: idFornecedor });
        const produto = new Produto(dados);
        await produto.criar();
        res.status(201);
        res.send(JSON.stringify(produto));
    } catch (erro) {
        next(erro);
    }
});

roteador.delete('/:idProduto', async (req, res) => {
    const idProduto = req.params['idProduto'];
    const produto = new Produto({ id: idProduto });
    await produto.deletar();
    res.status(204);
    res.end();
});

module.exports = roteador;