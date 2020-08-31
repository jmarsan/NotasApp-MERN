const { Schema, model } = require('mongoose')

const EsquemaUsuario = new Schema({
    nombreUsuario: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    timestamps:true
})

module.exports = model('User', EsquemaUsuario)