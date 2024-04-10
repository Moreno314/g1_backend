'use strict'

var express = require('express');
var usuarioController = require('../controllers/UsuarioController')

var api = express.Router();
var auth = require('../middlewares/authenticate.js')

api.post('/registro_usuario', usuarioController.registro_usuario);
api.post('/login_usuario', usuarioController.login_usuario);
api.get('/listar_usuarios_filtro_admin/:tipo/:filtro?', auth.auth, usuarioController.listar_usuarios_filtro_admin)

module.exports = api;