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
    }
};