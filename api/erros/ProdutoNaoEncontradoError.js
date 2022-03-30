class ProdutoNaoEncontradoError extends Error {
    constructor() {
        super('Produto não foi encontrado!');
        this.name = 'ProdutoNaoEncontradoError';
        this.status = 404;
        this.idErro = 4;
    }
}

module.exports = ProdutoNaoEncontradoError;