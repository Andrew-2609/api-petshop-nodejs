class Fornecedor {
    constructor({id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}) {
        this._id = id;
        this._empresa = empresa;
        this._email = email;
        this._categoria = categoria;
        this._dataCriacao = dataCriacao;
        this._dataAtualizacao = dataAtualizacao;
        this._versao = versao;
    }
}

module.exports = Fornecedor;
