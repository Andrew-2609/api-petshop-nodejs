const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar();
    res.status(200);
    res.send(JSON.stringify(resultados));
});

roteador.get('/:idFornecedor', async (req, res) => {
    const id = req.params['idFornecedor'];
    const fornecedor = new Fornecedor({id: id});
    try {
        await fornecedor.carregar();
        res.status(200);
        res.send(fornecedor);
    } catch (erro) {
        res.status(404);
        res.send(JSON.stringify({
            mensagem: erro.message
        }));
    }
});

roteador.post('/', async (req, res) => {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    try {
        await fornecedor.criar(dadosRecebidos);
        res.status(201);
        res.send(JSON.stringify(fornecedor));
    } catch (erro) {
        res.status(400);
        res.send(JSON.stringify({
            mensagem: erro.message
        }));
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

roteador.delete('/:idFornecedor', async (req, res) => {
    const id = req.params['idFornecedor'];
    const fornecedor = new Fornecedor({id: id});
    try {
        await fornecedor.carregar();
        await fornecedor.deletar();
        res.status(204);
        res.end();
    } catch (erro) {
        res.status(404);
        res.send(JSON.stringify({
            mensagem: erro.message
        }));
    }
});

module.exports = roteador;