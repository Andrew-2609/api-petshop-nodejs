const roteador = require('express').Router({ mergeParams: true });
const TabelaProduto = require('./TabelaProduto');
const Produto = require('./Produto');

roteador.get('/', async (req, res) => {
    const produtos = await TabelaProduto.listar(req.fornecedor.id);
    res.status(200);
    res.send(
        JSON.stringify(produtos)
    );
});

roteador.get('/:idProduto', async (req, res) => {
    const idProduto = req.params['idProduto'];
    const produto = new Produto({ id: idProduto });
    await produto.carregar();
    res.status(200);
    res.send(JSON.stringify(produto));
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