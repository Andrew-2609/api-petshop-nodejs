const TabelaFornecedor = require('./TabelaFornecedor');
const CampoInvalidoError = require('../../erros/CampoInvalidoError');
const DadosNaoFornecidosError = require('../../erros/DadosNaoFornecidosError');

class Fornecedor {
    constructor({id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}) {
        this.id = id;
        this.empresa = empresa;
        this.email = email;
        this.categoria = categoria;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;
    }

    async criar() {
        this.validarCampos();

        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        });

        this.id = resultado.id;
        this.dataCriacao = resultado.dataCriacao;
        this.dataAtualizacao = resultado.dataAtualizacao;
        this.versao = resultado.versao;
    }

    async carregar() {
        const fornecedorEncontrado = await TabelaFornecedor.pegarPorId(this.id);
        this.empresa = fornecedorEncontrado.empresa;
        this.email = fornecedorEncontrado.email;
        this.categoria = fornecedorEncontrado.categoria;
        this.dataCriacao = fornecedorEncontrado.dataCriacao;
        this.dataAtualizacao = fornecedorEncontrado.dataAtualizacao;
        this.versao = fornecedorEncontrado.versao;
    }

    async atualizar() {
        await TabelaFornecedor.pegarPorId(this.id);
        const campos = ['empresa', 'email', 'categoria'];
        const dadosParaAtualizar = {};

        campos.forEach(campo => {
            const valor = this[campo];
            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor;
            }
        });

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidosError();
        }

        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar);
    }

    deletar() {
        return TabelaFornecedor.deletar(this.id);
    }

    validarCampos() {
        const campos = ['empresa', 'email', 'categoria'];
        const erros = [];

        campos.forEach(campo => {
            const valor = this[campo];

            if (typeof valor !== 'string' || valor.length === 0) {
                erros.push(new CampoInvalidoError(campo));
            }
        });

        if (erros.length > 0) {
            throw new Error(erros.join('; '));
        }
    }
}

module.exports = Fornecedor;
