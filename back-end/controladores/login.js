const conexao = require('../db_conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const segredo = require('../segredo');

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(404).json('Email e senha são obrigatórios.')
    }

    try {
        const emailVerificado = 'select * from usuarios where email = $1';

        const { rows, rowCount } = await conexao.query(emailVerificado, [email])
        
        if (rowCount === 0) {
            return res.status(404).json('Usúario não encontrado.')
        }

        const usuario = rows[0];

        const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

        if (!senhaVerificada) {
            return res.status(400).json('Email e senha não encontrados.')
        }

        const token = jwt.sign({ id: usuario.id }, segredo, {expiresIn: '30d'});

        const { senha: senhaUsuario, ...dadosUsuario} = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        })
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    login
};