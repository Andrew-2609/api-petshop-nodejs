const Modelo = require('./ModeloTabelaFornecedor');

module.exports = {
    listar() {
        return Modelo.findAll();
    },
    async pegarPorId(id) {
        const fornecedorEncontrado = await Modelo.findOne({
            where: {id: id}
        });

        if (!fornecedorEncontrado) {
            throw new Error('Fornecedor não encontrado.');
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
                where: {id: id}
            }
        )
    },
    deletar(id) {
        return Modelo.destroy(
            {
                where: {id: id}
            }
        );
    }
};