const Modelo = require('./ModeloTabelaProduto');

module.exports = {
    listar(idFornecedor) {
        return Modelo.findAll({
            where: {
                idFornecedor: idFornecedor
            }
        });
    }
};