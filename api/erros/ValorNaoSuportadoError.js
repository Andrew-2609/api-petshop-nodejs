class ValorNaoSuportadoError extends Error {
    constructor(contentType) {
        super(`O tipo de conteúdo ${contentType} não é suportado!`);
        this.name = 'ValorNaoSuportadoError';
        this.status = 406;
        this.idErro = 3;
    }
}

module.exports = ValorNaoSuportadoError;