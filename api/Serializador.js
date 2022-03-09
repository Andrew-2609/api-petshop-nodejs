const ValorNaoSuportadoError = require('./erros/ValorNaoSuportadoError');
const jsontoxml = require('jsontoxml');

class Serializador {
    contentType;
    camposPublicos;
    tag;

    serializar(dados) {
        dados = this.filtrar(dados);

        if (this.contentType === 'application/json') {
            return this.json(dados);
        }

        if (this.contentType === 'application/xml') {
            return this.xml(dados);
        }

        throw new ValorNaoSuportadoError(this.contentType);
    }

    json(dados) {
        return JSON.stringify(dados);
    }

    xml(dados) {
        return jsontoxml({[this.tag]: dados});
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
        this.tag = 'fornecedor';
    }
}

class SerializadorErro extends Serializador {
    constructor(contentType, camposExtras) {
        super();
        this.contentType = contentType;
        this.camposPublicos = ['id', 'mensagem']
            .concat(camposExtras || []);
        this.tag = 'erro';
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    SerializadorErro: SerializadorErro,
    formatosAceitos: ['application/json', 'application/xml']
};