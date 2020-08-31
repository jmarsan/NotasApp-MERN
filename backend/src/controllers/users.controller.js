const userCtrl = {}

const User = require('../models/User')


userCtrl.getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

userCtrl.createUser = async (req, res) => {
    const { nombreUsuario } = req.body
    const nuevoUsuario = new User({nombreUsuario})
    console.log(nuevoUsuario)
    await nuevoUsuario.save() 
    res.json({message: 'Usuario Creado'})
}

userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({message: 'Usuario borrado'})
}

module.exports = userCtrl
