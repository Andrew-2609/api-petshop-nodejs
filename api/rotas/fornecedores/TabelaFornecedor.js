const Modelo = require('./ModeloTabelaFornecedor');
const FornecedorNaoEncontrado = require('../../erros/FornecedorNaoEncontradoError');

module.exports = {
    listar() {
        return Modelo.findAll({ raw: true });
    },
    async pegarPorId(id) {
        const fornecedorEncontrado = await Modelo.findOne({
            where: { id: id }
        });

        if (!fornecedorEncontrado) {
            throw new FornecedorNaoEncontrado();
        }

        return fornecedorEncontrado;
    },
    inserir(fornecedor) {
        return Modelo.create(fornecedor);
    },
    atualizar(id, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: id }
            }
        );
    },
    deletar(id) {
        return Modelo.destroy(
            {
                where: { id: id }
            }
        );
    }
};