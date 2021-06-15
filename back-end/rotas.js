const express = require('express');

const usuarios = require('./controladores/usuarios');
const produtos = require('./controladores/produtos');
const login = require('./controladores/login');
const verificarLogin = require('./middleware/verificarLogin');

const rotas = express();

//Login
rotas.post('/login', login.login);

//Usuario
rotas.post('/cadastro', usuarios.cadastrarUsuario);

rotas.use(verificarLogin);

rotas.get('/perfil', usuarios.detalhes);
rotas.put('/perfil', usuarios.alterarUsuario);

//Produtos
rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:id');
rotas.post('/produtos', produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.alterarProduto);
rotas.delete('/produtos/:id', produtos.deletarProduto);


module.exports = rotas;