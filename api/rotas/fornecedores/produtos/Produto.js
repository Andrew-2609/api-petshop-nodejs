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
}

module.exports = Produto;