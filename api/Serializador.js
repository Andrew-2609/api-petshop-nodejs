const ValorNaoSuportadoError = require('./erros/ValorNaoSuportadoError');

class Serializador {
    contentType;
    camposPublicos;

    serializar(dados) {
        if (this.contentType === 'application/json') {
            return this.json(this.filtrar(dados));
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

    filtrar(dados) {
        if (Array.isArray(dados)) {
            dados = dados.map(item => this.filtrarObjeto(item));
        } else {
            dados = this.filtrarObjeto(dados);
        }

        return dados;
    }
}

class SerializadorFornecedor extends Serializador {
    constructor(contentType, camposExtras) {
        super();
        this.contentType = contentType;
        this.camposPublicos = ['id', 'empresa', 'categoria']
            .concat(camposExtras || []);
    }
}

class SerializadorErro extends Serializador {
    constructor(contentType, camposExtras) {
        super();
        this.contentType = contentType;
        this.camposPublicos = ['id', 'mensagem']
            .concat(camposExtras || []);
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    SerializadorErro: SerializadorErro,
    formatosAceitos: ['application/json', 'application/xml']
};