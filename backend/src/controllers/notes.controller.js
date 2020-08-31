const notesCtrl = {}

const Note = require('../models/Note')

notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find()
    res.json(notes)
}

notesCtrl.createNote = async (req, res) => {
    //console.log(req.body)
    const { titulo, contenido, fecha, autor } = req.body
    const newNote = new Note ({
        titulo: titulo,
        contenido: contenido,
        fecha: fecha,
        autor: autor
    })
    console.log(newNote)
    await newNote.save()
    res.json({message: 'Nota Guardada'})
}

notesCtrl.getNote = async (req, res) => {
    //console.log(req.params.id)
    const note = await Note.findById(req.params.id)
    console.log(note)
    res.json(note)
}

notesCtrl.updateNote = async (req, res) => {
    //console.log(req.params.id, req.body)
    //Note.findByIdAndUpdate(req.params.id, req.body)
    const { titulo, contenido, autor} = req.body
    await Note.findOneAndUpdate(req.params.id,{
        titulo,
        contenido,
        autor
    })
    res.json({message: 'Nota Actualizada'})
}

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.json({message: 'Nota Elimminada'})
}

module.exports = notesCtrl