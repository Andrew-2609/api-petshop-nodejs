const TabelaProduto = require('./TabelaProduto');

class Produto {
    constructor({id, titulo, preco, estoque, idFornecedor, dataCriacao, dataAtualizacao, versao}) {
        this.id = id;
        this.titulo = titulo;
        this.preco = preco;
        this.estoque = estoque;
        this.idFornecedor = idFornecedor;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;
    }

    async criar() {
        const resultado = await TabelaProduto.inserir({
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            idFornecedor: this.idFornecedor
        });

        this.id = resultado.id;
        this.dataCriacao = resultado.dataCriacao;
        this.dataAtualizacao = resultado.dataAtualizacao;
        this.versao = resultado.versao;
    }

    deletar() {
        return TabelaProduto.deletar(this.id);
    }
}

module.exports = Produto;