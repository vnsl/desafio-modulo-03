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
rotas.put('/perfil');

//Produtos
rotas.get('/produtos');
rotas.get('/produtos/:id');
rotas.post('/produtos', produtos.cadastroProduto);
rotas.put('/produtos/:id');
rotas.delete('/produtos/:id');


module.exports = rotas;