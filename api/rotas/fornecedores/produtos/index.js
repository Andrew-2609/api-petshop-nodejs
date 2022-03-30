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

roteador.get('/produtos-com-baixo-estoque', async (req, res, next) => {
    const produtosAbaixoDoEstoque = await TabelaProduto.checarEstoqueBaixo(req.fornecedor.id);

    const serializador = new SerializadorProduto(res.getHeader('Content-Type'), ['quantidade', 'produtos']);

    res.status(200);
    res.send(serializador.serializar(
        { quantidade: produtosAbaixoDoEstoque.length, produtos: produtosAbaixoDoEstoque },
    ));
});

roteador.get('/:idProduto', async (req, res, next) => {
    const idProduto = req.params['idProduto'];
    const produto = new Produto({ id: idProduto });

    try {
        await produto.carregar();

        const serializador = new SerializadorProduto(
            res.getHeader('Content-Type'),
            ['idFornecedor', 'preco', 'estoque', 'dataCriacao', 'dataAtualizacao', 'versao']
        );

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

        const serializador = new SerializadorProduto(res.getHeader('Content-Type'));

        res.set('ETag', produto.versao);
        res.set('Last-Modified', new Date(produto.dataAtualizacao).getTime());
        res.set('Location', `/api/fornecedores/${produto.idFornecedor}/${produto.id}`);
        res.status(201);
        res.send(serializador.serializar(produto));
    } catch (erro) {
        next(erro);
    }
});

roteador.put('/:idProduto', async (req, res, next) => {
    const idProduto = req.params['idProduto'];
    const corpo = req.body;
    const dados = Object.assign({}, corpo, { id: idProduto });
    const produto = new Produto(dados);

    try {
        await produto.atualizar();
        res.status(204);
        res.end();
    } catch (erro) {
        next(erro);
    }
});

roteador.patch('/:idProduto/diminuir-estoque', async (req, res, next) => {
    const idProduto = req.params['idProduto'];
    const produto = new Produto({ id: idProduto });
    try {
        await produto.carregar();
        produto.estoque -= Math.abs(req.body['quantidade']);
        await produto.subtrairEstoque();

        res.status(204);
        res.end();
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