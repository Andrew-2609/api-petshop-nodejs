class DadosNaoFornecidosError extends Error {
    constructor() {
        super('Não foram fornecidos dados para atualizar!');
        this.name = 'DadosNaoFornecidosError';
        this.status = 400;
        this.idErro = 2;
    }
}

module.exports = DadosNaoFornecidosError;