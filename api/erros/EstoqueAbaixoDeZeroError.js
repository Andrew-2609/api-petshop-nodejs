class EstoqueAbaixoDeZeroError extends Error {
    constructor() {
        const mensagem = 'Essa ação deixaria o estoque do Produto abaixo de zero!';
        super(mensagem);
        this.name = 'EstoqueAbaixoDeZeroError';
        this.status = 400;
        this.idErro = 5;
    }
}

module.exports = EstoqueAbaixoDeZeroError;