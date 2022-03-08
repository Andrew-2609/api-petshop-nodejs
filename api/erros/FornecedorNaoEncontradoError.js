class FornecedorNaoEncontradoError extends Error {
    constructor() {
        super('Fornecedor não foi encontrado!');
        this.name = 'FornecedorNaoEncontradoError';
        this.idErro = 0;
    }
}

module.exports = FornecedorNaoEncontradoError;