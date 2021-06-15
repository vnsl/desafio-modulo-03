const conexao = require('../db_conexao');
const segredo = require('../segredo');
const jwt = require('jsonwebtoken');

const cadastroProduto = async (req, res) => {
    const { nome, estoque, categoria, preco, descricao, imagem } = req.body;
    const { usuario } = req;
    if (!nome) {
        res.status(404).json('O campo nome é obrigatório.')
    }
    if (!estoque) {
        res.status(404).json('O campo estoque é obrigatório.')
    }
    if (!categoria) {
        res.status(404).json('O campo categoria é obrigatório.')
    }
    if (!preco) {
        res.status(404).json('O campo preco é obrigatório.')
    }
    
    try {
        const queryProduto = 'insert into produtos (usuario_id, nome, estoque, categoria, preco, descricao, imagem) values ($1, $2, $3, $4, $5, $6, $7)';
        const produto = await conexao.query(queryProduto, [usuario.id, nome, estoque, categoria, preco, descricao, imagem]);

        if (produto.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar produto.')
        }

        return res.status(200).json('O produto foi cadastrado com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const alterarProduto = async (req, res) => {
    const { nome, estoque, categoria, preco, descricao, imagem } = req.body;
    const { usuario } = req;
    if (!nome) {
        res.status(404).json('O campo nome é obrigatório.')
    }
    if (!estoque) {
        res.status(404).json('O campo estoque é obrigatório.')
    }
    if (!categoria) {
        res.status(404).json('O campo categoria é obrigatório.')
    }
    if (!preco) {
        res.status(404).json('O campo preco é obrigatório.')
    }
    
    try {
        const queryProduto = 'insert into produtos (usuario_id, nome, estoque, categoria, preco, descricao, imagem) values ($1, $2, $3, $4, $5, $6, $7)';
        const produto = await conexao.query(queryProduto, [usuario.id, nome, estoque, categoria, preco, descricao, imagem]);

        if (produto.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar produto.')
        }

        return res.status(200).json('O produto foi cadastrado com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message);
    }
}
module.exports = {
    cadastroProduto,
    alterarProduto
};