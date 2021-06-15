const conexao = require('../db_conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, nome_loja, email, senha} = req.body;

    if (!nome) {
        return res.status(404).json('O campo nome é obrigatório.');
    }
    if (!nome_loja) {
        return res.status(404).json('O campo nome da loja é obrigatório.');
    }
    if (!email) {
        return res.status(404).json('O campo email é obrigatório.');
    }
    if (!senha) {
        return res.status(404).json('O campo senha é obrigatório.');
    }

    try {
        const consultaEmail = 'select * from usuarios where email = $1';
        const { rowCount: quantidadeUsuarios } = await conexao.query(consultaEmail, [email]);

        if (quantidadeUsuarios > 0) {
            return res.status(400).json('Email já cadastrado.')
        };

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const query = 'insert into usuarios (nome, nome_loja, email, senha) values ($1, $2, $3, $4)';

        const usuarioCadastrado = await conexao.query(query, [nome, nome_loja, email, senhaCriptografada])

        if (usuarioCadastrado.rowCount == 0) {
            return res.status(400).json('Não foi possivel cadastrar o usuario.')
        }

        return res.status(200).json('Usuario cadastrado com sucesso.')
    } catch (error) {
        return res.status(error.message);
    }


};

const detalhes = async (req, res) => {
    const usuario = req.usuario;
    res.status(200).json(usuario);
};

module.exports = {
    cadastrarUsuario,
    detalhes
};