const Modelo = require('./ModeloTabelaProduto');

module.exports = {
    listar(idFornecedor) {
        return Modelo.findAll({
            where: {
                idFornecedor: idFornecedor
            }
        });
    },
    inserir(produto) {
        return Modelo.create(produto);
    },
    deletar(idProduto) {
        return Modelo.destroy({
            where: {id: idProduto}
        });
    }
};