class ProdutoNaoEncontradoError extends Error {
    constructor() {
        super('Produto não foi encontrado!');
        this.name = 'ProdutoNaoEncontradoError';
        this.idErro = 4;
    }
}

module.exports = ProdutoNaoEncontradoError;