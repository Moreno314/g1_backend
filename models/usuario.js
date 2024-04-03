'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    escuela: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    perfil: { type: String, default: 'perfil.png', required: true },
    telefono: { type: String, required: false },
    genero: { type: String, required: false },
    f_nacimiento: { type: String, required: false },
    codigo_univ: { type: String, required: false },
})

module.exports = mongoose.model('usuario', UsuarioSchema)