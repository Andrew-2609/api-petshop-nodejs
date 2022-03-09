const ValorNaoSuportadoError = require('./erros/ValorNaoSuportadoError');

class Serializador {
    contentType;

    serializar(dados) {
        if (this.contentType === 'application/json') {
            return this.json(dados);
        }

        throw new ValorNaoSuportadoError(this.contentType);
    }

    json(dados) {
        return JSON.stringify(dados);
    }
}

class SerializadorFornecedor extends Serializador {
    constructor(contentType) {
        super();
        this.contentType = contentType;
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    formatosAceitos: ['application/json']
};