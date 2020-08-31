const express = require('express')
//import express from 'express' forma nueva de poder hacerlo?
const cors = require('cors')
const app = express()

// settings - Configuración del servidor
app.set('port', process.env.PORT || 4000)

// middlewares - Definir funciones a ejecutar antes de llegar a las rutas o URL's
app.use(cors())
app.use(express.json())

// routes
app.use('/api/users', require('./routes/users'))
app.use('/api/notes', require('./routes/notes'))

module.exports = app