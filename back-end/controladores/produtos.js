const conexao = require('../db_conexao');

const cadastrarProduto = async (req, res) => {
    const { nome, estoque, categoria, preco, descricao, imagem } = req.body;
    const { usuario } = req;

    if (!nome) {
        return res.status(404).json('O campo nome é obrigatório.')
    }
    if (!estoque) {
        return res.status(404).json('O campo estoque é obrigatório.')
    }
    if (!categoria) {
        return res.status(404).json('O campo categoria é obrigatório.')
    }
    if (!preco) {
        return res.status(404).json('O campo preco é obrigatório.')
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
    const { id: idProduto } = req.params;

    if (!nome || !estoque || !categoria || !preco || !descricao || !imagem) {
        console.log('Deu');
        return res.status(400).json('Ao menos 1 campo deve ser passado.')
    }
    
    try {
        const queryProduto = 'select * from produtos where id = $1 and usuario_id = $2';
        const produtoExistente = await conexao.query(queryProduto, [idProduto, usuario.id]);

        if (produtoExistente.rowCount === 0) {
            return res.status(400).json('Produto não foi encontrado.')
        }

        const queryAlterarProduto = 'update produtos set nome = $1, estoque = $2, categoria = $3, preco = $4, descricao = $5, imagem =$6 where id = $7 and usuario_id = $8';
        const alterarProduto = await conexao.query(queryAlterarProduto, [nome, estoque, categoria, preco, descricao, imagem, idProduto, usuario.id]);

        if (alterarProduto.rowCount === 0) {
            return res.status(400).json('Não foi possível atualizar os dados do produto.')
        }

        return res.status(200).json('O produto foi atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const deletarProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const queryProduto = 'select * from produtos where id = $1 and usuario_id = $2';
        const produtoExistente = await conexao.query(queryProduto, [id, usuario.id]);

        if (produtoExistente.rowCount === 0) {
            return res.status(400).json('Produto não foi encontrado.');
        }

        const { rowCount } = await conexao.query('delete from produtos where id = $1', [id]);

        if (rowCount === 0) {
            return res.status(400).json('Não foi possível excluir o produto.')
        }

        return res.status(200).json('Produto excluído com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

const listarProdutos = async (req, res) => {
    try {
        const produtos = await conexao.query('select * from produtos');

        return res.status(200).json(produtos.rows);

    } catch (error) {
        return res.status(400).json(error.message);
    }


};


module.exports = {
    cadastrarProduto,
    alterarProduto,
    deletarProduto, 
    listarProdutos
};