const { Schema, model } = require('mongoose')

const EsquemaNota = new Schema({
    titulo: String,
    contenido: {
        type: String,
        required: true
    },
    autor: String,
    fecha: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

module.exports = model('Note', EsquemaNota)