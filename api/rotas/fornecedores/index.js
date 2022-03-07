const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar();
    res.send(JSON.stringify(resultados));
});

roteador.get('/:idFornecedor', async (req, res) => {
    const id = req.params['idFornecedor'];
    const fornecedor = new Fornecedor({id: id});
    try {
        await fornecedor.carregar()
        res.send(fornecedor);
    } catch (erro) {
        res.send(JSON.stringify({
            mensagem: erro.message
        }));
    }
});

roteador.post('/', async (req, res) => {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.criar(dadosRecebidos);
    res.send(JSON.stringify(fornecedor));
});

roteador.put('/:idFornecedor', async (req, res) => {
    const dadosRecebidos = req.body;
    const id = req.params['idFornecedor'];
    const dados = Object.assign({}, dadosRecebidos, {id: id});
    const fornecedor = new Fornecedor(dados);
    try {
        await fornecedor.atualizar();
        res.end();
    } catch (erro) {
        res.send(JSON.stringify({
            mensagem: erro.message
        }));
    }
});

roteador.delete('/:idFornecedor', async (req, res) => {
    const id = req.params['idFornecedor'];
    const fornecedor = new Fornecedor({id: id});
    try {
        await fornecedor.carregar();
        await fornecedor.deletar();
        res.end();
        res.status(204);
    } catch (erro) {
        res.send(JSON.stringify({
            mensagem: erro.message
        }));
    }
});

module.exports = roteador;