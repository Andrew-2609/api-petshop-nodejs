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
        this.validar();
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

    async carregar() {
        const produtoEncontrado = await TabelaProduto.pegarPorId(this.id);
        this.titulo = produtoEncontrado.titulo;
        this.preco = produtoEncontrado.preco;
        this.estoque = produtoEncontrado.estoque;
        this.idFornecedor = produtoEncontrado.idFornecedor;
        this.dataCriacao = produtoEncontrado.dataCriacao;
        this.dataAtualizacao = produtoEncontrado.dataAtualizacao;
        this.versao = produtoEncontrado.versao;
    }

    deletar() {
        return TabelaProduto.deletar(this.id);
    }

    validar() {
        if (typeof this.titulo !== 'string' || this.titulo.length === 0) {
            throw new Error(`O campo 'titulo' passado é inválido!`);
        }

        if (this.preco <= 0) {
            throw new Error(`O campo 'preco' passado é inválido!`);
        }

        if (this.estoque < 0) {
            throw new Error(`O campo 'estoque' passado é inválido!`);
        }
    }
}

module.exports = Produto;