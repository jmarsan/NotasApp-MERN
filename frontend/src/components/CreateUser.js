import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    state = {
        users: [],
        nombreUsuario: ''
    }

    async componentDidMount(){
        this.getUsers()
        console.log(this.state.users)
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users')
        //console.log(res)
        this.setState({users: res.data})
    }

    onChangeUsername = (e) => {
        console.log(e.target.value)
        this.setState({
            nombreUsuario: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault()
        const res = await axios.post('http://localhost:4000/api/users', {
            nombreUsuario: this.state.nombreUsuario
        })
        console.log(res)
        this.setState({nombreUsuario: ''})
        this.getUsers()
    }

    deleteUser = async (id) => {
        await axios.delete('http://localhost:4000/api/users/' + id)
        this.getUsers()
        console.log(id)
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Crear usuario</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value = {this.state.nombreUsuario}
                                    onChange={this.onChangeUsername} 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li 
                                    className="list-group-item list-group-intem-action" 
                                    key={user._id}
                                    onDoubleClick = {() => this.deleteUser(user._id)}
                                >
                                    {user.nombreUsuario}
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
