'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'alejandromoreno'

exports.createToken = function (user) {
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.rol,
        lat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    }

    return jwt.encode(payload, secret);
}
