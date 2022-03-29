const Modelo = require('./ModeloTabelaProduto');
const ProdutoNaoEncontradoError = require('../../../erros/ProdutoNaoEncontradoError');

module.exports = {
    listar(idFornecedor) {
        return Modelo.findAll({
            where: { idFornecedor: idFornecedor }, raw: true
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
    deletar(idProduto) {
        return Modelo.destroy({
            where: { id: idProduto }
        });
    }
};