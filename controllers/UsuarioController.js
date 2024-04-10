'use strict'

var Usuario = require('../models/usuario');
var bcrypt = require('bcrypt-nodejs')
var jwt = require('../helpers/jwt');

const registro_usuario = async function (req, res) {
    var data = req.body;
    var usuarios_arr = [];

    usuarios_arr = await Usuario.find({ email: data.email });
    if (usuarios_arr.length == 0) {
        if (data.password) {
            bcrypt.hash(data.password, null, null, async function (err, hash) {
                // Verificando si hay una contraseña encriptada
                if (hash) {
                    data.password = hash;
                    var reg = await Usuario.create(data);
                    res.status(200).send({ data: reg })
                } else {
                    res.status(200).send({ message: 'ErrorServer', data: undefined })
                }
            })

        } else {
            res.status(200).send({ message: 'No hay una contraseña', data: undefined })
        }

    } else {
        res.status(200).send({ message: 'El correo ya existe', data: undefined })
    }
}

const login_usuario = async function (req, res) {
    var data = req.body;
    //Verificar si esta en la base de datos
    var usuario_arr = await Usuario.find({ email: data.email });

    if (usuario_arr.length == 0) {
        res.status(200).send({ message: 'No se encontro el correo', data: undefined })
    } else {
        //Login
        let user = usuario_arr[0];

        bcrypt.compare(data.password, user.password, async function (error, check) {
            if (check) {
                res.status(200).send({
                    data: user,
                    token: jwt.createToken(user)
                });
            } else {
                res.status(200).send({ message: 'La contraseña no coincide', data: undefined })
            }
        });

    }
}

const listar_usuarios_filtro_admin = async function (req, res) {

    console.log(req.user);
    if (req.user) {
        if (req.user.role == 'admin') {
            let tipo = req.params['tipo'];
            let filtro = req.params['filtro'];


            if (tipo == null || tipo == 'null') {
                let reg = await Usuario.find();
                res.status(200).send({ data: reg });
            } else {
                if (tipo == 'apellidos') {
                    let reg = await Usuario.find({ apellidos: new RegExp(filtro, 'i') });
                    res.status(200).send({ data: reg });

                } else if (tipo == 'correo') {
                    let reg = await Usuario.find({ email: new RegExp(filtro, 'i') });
                    res.status(200).send({ data: reg });

                }
            }
        } else {
            res.status(500).send({ message: 'NoAcceso' });
        }
    } else {
        res.status(500).send({ message: 'NoAcceso' });
    }

}

module.exports = {
    registro_usuario,
    login_usuario,
    listar_usuarios_filtro_admin
}