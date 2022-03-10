const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const {SerializadorFornecedor} = require('../../Serializador');
const roteadorProdutos = require('./produtos');

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar();

    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));

    res.status(200);
    res.send(serializador.serializar(resultados));
});

roteador.get('/:idFornecedor', async (req, res, next) => {
    const id = req.params['idFornecedor'];
    const fornecedor = new Fornecedor({id: id});
    try {
        await fornecedor.carregar();

        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type'),
            ['email', 'dataCriacao', 'dataAtualizacao']
        );

        res.status(200);
        res.send(serializador.serializar(fornecedor));
    } catch (erro) {
        next(erro);
    }
});

roteador.post('/', async (req, res, next) => {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    try {
        await fornecedor.criar(dadosRecebidos);

        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));

        res.status(201);
        res.send(serializador.serializar(fornecedor));
    } catch (erro) {
        next(erro);
    }
});

roteador.put('/:idFornecedor', async (req, res, next) => {
    const dadosRecebidos = req.body;
    const id = req.params['idFornecedor'];
    const dados = Object.assign({}, dadosRecebidos, {id: id});
    const fornecedor = new Fornecedor(dados);
    try {
        await fornecedor.atualizar();
        res.status(204);
        res.end();
    } catch (erro) {
        next(erro);
    }
});

roteador.delete('/:idFornecedor', async (req, res, next) => {
    const id = req.params['idFornecedor'];
    const fornecedor = new Fornecedor({id: id});
    try {
        await fornecedor.carregar();
        await fornecedor.deletar();
        res.status(204);
        res.end();
    } catch (erro) {
        next(erro);
    }
});

roteador.use('/:idFornecedor/produtos', roteadorProdutos);

module.exports = roteador;