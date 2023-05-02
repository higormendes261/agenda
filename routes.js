const express = require('express');
const route = express.Router();

const usuariosController = require('./src/controllers/usuariosController');
const loginController = require('./src/controllers/loginController');
const editarUsuarioController = require('./src/controllers/editarUsuarioController');
const cadastroController = require('./src/controllers/cadastroController');
const duvidasController = require('./src/controllers/duvidasController');
const novaInstrucaoController = require('./src/controllers/novaInstrucaoController');
const instrucoesController = require('./src/controllers/instrucoesController');
const homeController = require('./src/controllers/homeController');
const instrucaoController = require('./src/controllers/instrucaoController');
const indexController = require('./src/controllers/indexController');


const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', indexController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//Rota de cadastro
route.get('/cadastro/index', cadastroController.index);
route.post('/cadastro/register', cadastroController.register);

// Rotas de editar usuarios
route.get('/usuarios/index', loginRequired, usuariosController.index);
route.get('/editarUsuario/index', loginRequired, editarUsuarioController.index);
route.get('/editarUsuario/index/:id', loginRequired, editarUsuarioController.editIndex);
route.post('/editarUsuario/edit/:id', loginRequired, editarUsuarioController.edit);
route.get('/editarUsuario/delete/:id', loginRequired, editarUsuarioController.delete);

// Rotas de dúvidas
route.get('/duvidas/index', duvidasController.index);

//Rota de instrução
route.get('/instrucao/index', loginRequired, instrucoesController.index);
route.get('/novaInstrucao/index', loginRequired, novaInstrucaoController.index);
route.post('/novaInstrucao/register', loginRequired, novaInstrucaoController.register);
route.get('/novaInstrucao/index/:id', loginRequired, novaInstrucaoController.editIndex);
route.post('/novaInstrucao/edit/:id', loginRequired, novaInstrucaoController.edit);
route.get('/novaInstrucao/delete/:id', loginRequired, novaInstrucaoController.delete);
route.get('/instrucao2/index/:id', loginRequired, instrucaoController.editIndex);

//Rota para home
route.get('/home/index', homeController.index);

//Rota para o index
route.get('/index', indexController.index);

module.exports = route;
