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

const alterarUsuario = async (req, res) => {
    const { nome, nome_loja, email, senha } = req.body;
    const { usuario } = req;

    if (!nome && !nome_loja && !email && !senha) {
        return res.status(404).json('Ao menos 1 campo deve ser preenchido.')
    };
    
    const novoNome = nome ? nome : usuario.nome;
    const novoNome_loja = nome_loja ? nome_loja : usuario.nome_loja;
    const novoEmail = email ? email : usuario.email;
    const novaSenha = senha ? senha : null;
    
    try {
        const consultaEmail = 'select * from usuarios where email = $1';
        const { rowCount: quantidadeUsuarios, rows: user } = await conexao.query(consultaEmail, [novoEmail]);

        if (quantidadeUsuarios > 0 && user[0].id !== usuario.id) {
            return res.status(400).json('Email já cadastrado.')
        };
        
        if (novaSenha) {
            const senhaVerificada = await bcrypt.compare(novaSenha, user[0].senha);
    
            if (senhaVerificada) {
                return res.status(400).json('Senha já utilizada anteriormente.')
            };
        };
        const senhaCriptografada = novaSenha ? await bcrypt.hash(novaSenha, 10) : user[0].senha;

        const query = 'update usuarios set nome = $1, nome_loja = $2, email = $3, senha = $4 where id = $5';

        const usuarioAtualizado = await conexao.query(query, [novoNome, novoNome_loja, novoEmail, senhaCriptografada, usuario.id]);

        if (usuarioAtualizado.rowCount == 0) {
            return res.status(400).json('Não foi possivel atualizar o cadastro do usuario.')
        }

        return res.status(200).json('Usuario atualizado com sucesso.')
    } catch (error) {
        return res.status(error.message);
    }
};

module.exports = {
    cadastrarUsuario,
    detalhes,
    alterarUsuario
};