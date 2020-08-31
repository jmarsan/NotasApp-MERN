const mongoose = require('mongoose')

//console.log(process.env.MONGODB_URI)
const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/databasetest'

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true /* (node:9400) DeprecationWarning: current Server Discovery and Monitoring 
    engine is deprecated, and will be removed in a future version. To use the new Server Discover and 
    Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.*/,
    useFindAndModify: false
})

const connection = mongoose.connection

connection.once('open', () => {
    console.log('Base de datos conectada')
})