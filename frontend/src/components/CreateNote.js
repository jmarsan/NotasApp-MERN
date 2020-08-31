import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        titulo: '',
        content: '',
        date: new Date(),
        editando: false,
        _id: ''
    }

     async componentDidMount(){
        //console.log(this.props.match.params.id)
        const res = await axios.get('http://localhost:4000/api/users')
        //console.log(res.data)
        //this.setState({users: res.data}) // Recupera el json entero de los usuarios
        this.setState({
            users: res.data.map(user => user.nombreUsuario), // Recupera solo el nombre
            userSelected: res.data[0].nombreUsuario
        })
        //console.log(this.state.users)
        if (this.props.match.params.id){
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id)
            //console.log(res.data)
            this.setState({
                titulo: res.data.titulo,
                content: res.data.contenido,
                userSelected: res.data.autor,
                date: new Date(res.data.fecha),
                editando: true,
                _id: this.props.match.params._id
            })
        }
    }

    onSubmit = async (e) =>{
        e.preventDefault()
        const newNote = {
            titulo: this.state.titulo,
            contenido: this.state.content,
            autor: this.state.userSelected,
            fecha: this.state.date
        }
        if (this.state.editando){
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote)
        }else{
            await axios.post('http://localhost:4000/api/notes', newNote)
            //console.log(res)
        }
        console.log(this.state.titulo, this.state.userSelected, this.state.content, this.state.date)
        window.location.href = '/'
    }

    onImputChange = e => {
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        console.log(date)
        this.setState({date})
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3" >
                <div className="card card-body">
                    <h4>Crear Nota</h4>

                    {/** SELECT USER */}
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="userSelected"
                            onChange={this.onImputChange}
                            value={this.state.userSelected}
                        >
                            {
                                /* this.state.users.map(user => 
                                    <option key={user._id}>
                                        {user.nombreUsuario}
                                    </option>)
                                */
                               this.state.users.map(user => 
                                <option key={user} value={user  }>
                                    {user}
                                </option>)
                            }
                        </select>
                    </div>

                    <div className="form-group">    {/** Título */}
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder ="Título" 
                            name="titulo"
                            onChange={this.onImputChange}
                            value={this.state.titulo}
                            required
                        />
                    </div>
                    <div className="form-group">    {/** Contenido */}
                        <textarea 
                            name="content"
                            className="form-control"
                            placeholder="Contenido"
                            onChange={this.onImputChange}
                            value={this.state.content}
                            required
                        >

                        </textarea>
                    </div>

                    <div className="form-group">    {/** Fecha */}
                        <DatePicker 
                            className="form-control"
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
