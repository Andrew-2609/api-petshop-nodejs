const Modelo = require('./ModeloTabelaProduto');
const ProdutoNaoEncontradoError = require('../../../erros/ProdutoNaoEncontradoError');
const instancia = require('../../../banco-de-dados');
const { Op } = require('sequelize');

module.exports = {
    listar(idFornecedor) {
        return Modelo.findAll({
            where: { idFornecedor: idFornecedor }, raw: true
        });
    },
    checarEstoqueBaixo(idFornecedor) {
        return Modelo.findAll({
            where: { idFornecedor: idFornecedor, estoque: { [Op.lt]: 56 } }, 
            raw: true,
            attributes: ['id', 'titulo', 'estoque']
        });
    },
    async pegarPorId(idProduto) {
        const produtoEncontrado = await Modelo.findOne({
            where: { id: idProduto }, raw: true
        });

        if (!produtoEncontrado) {
            throw new ProdutoNaoEncontradoError();
        }

        return produtoEncontrado;
    },
    inserir(produto) {
        return Modelo.create(produto);
    },
    atualizar(idProduto, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: idProduto }
            }
        );
    },
    subtrairEstoque(idProduto, campoEstoque, quantidade) {
        return instancia.transaction(async transacao => {
            const produto = await Modelo.findOne({ where: { id: idProduto } });

            produto[campoEstoque] = quantidade;

            await produto.save();

            return produto;
        });
    },
    deletar(idProduto) {
        return Modelo.destroy({
            where: { id: idProduto }
        });
    }
};