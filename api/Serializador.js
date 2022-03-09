const ValorNaoSuportadoError = require('./erros/ValorNaoSuportadoError');

class Serializador {
    contentType;
    camposPublicos;

    serializar(dados) {
        if (this.contentType === 'application/json') {
            return this.json(this.filtrarObjeto(dados));
        }

        throw new ValorNaoSuportadoError(this.contentType);
    }

    json(dados) {
        return JSON.stringify(dados);
    }

    filtrarObjeto(dados) {
        const objetoResposta = {};

        this.camposPublicos.forEach(campo => {
            if (dados.hasOwnProperty(campo)) {
                objetoResposta[campo] = dados[campo];
            }
        });

        return objetoResposta;
    }
}

class SerializadorFornecedor extends Serializador {
    constructor(contentType) {
        super();
        this.contentType = contentType;
        this.camposPublicos = ['id', 'empresa', 'categoria'];
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    formatosAceitos: ['application/json']
};