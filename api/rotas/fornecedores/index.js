const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar();
    res.send(JSON.stringify(resultados));
});

roteador.get('/:idFornecedor', async (req, res) => {
    const id = req.params["idFornecedor"];
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

module.exports = roteador;