class CampoInvalidoError extends Error {
    constructor(campo) {
        const mensagem = `O campo '${campo}' passado é inválido`;
        super(mensagem);
        this.name = 'CampoInvalidoError';
        this.status = 400;
        this.idErro = 1;
    }
}

module.exports = CampoInvalidoError;