class DadosNaoFornecidosError extends Error {
    constructor() {
        super('Não foram fornecidos dados para atualizar!');
        this.name = 'DadosNaoFornecidosError';
        this.idErro = 3;
    }
}

module.exports = DadosNaoFornecidosError;