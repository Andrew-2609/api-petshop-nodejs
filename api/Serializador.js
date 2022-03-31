const ValorNaoSuportadoError = require('./erros/ValorNaoSuportadoError');
const jsontoxml = require('jsontoxml');

class Serializador {
    contentType;
    camposPublicos;
    tagSingular;
    tagPlural;

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
        let tag;

        if (Array.isArray(dados)) {
            tag = this.tagPlural;
            dados = dados.map(item => ({ [this.tagSingular]: item }))
        } else {
            tag = this.tagSingular;
        }

        return jsontoxml({ [tag]: dados });
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
        this.camposPublicos = ['id', 'categoria']
            .concat(camposExtras || []);
        this.tagSingular = 'fornecedor';
        this.tagPlural = 'fornecedores';
    }
}

class SerializadorProduto extends Serializador {
    constructor(contentType, camposExtras) {
        super();
        this.contentType = contentType;
        this.camposPublicos = ['id', 'titulo']
            .concat(camposExtras || []);
        this.tagSingular = 'produto';
        this.tagPlural = 'produtos';
    }
}

class SerializadorErro extends Serializador {
    constructor(contentType, camposExtras) {
        super();
        this.contentType = contentType;
        this.camposPublicos = ['id', 'mensagem']
            .concat(camposExtras || []);
        this.tagSingular = 'erro';
        this.tagPlural = 'erros';
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    SerializadorProduto: SerializadorProduto,
    SerializadorErro: SerializadorErro,
    formatosAceitos: ['application/json', 'application/xml']
};