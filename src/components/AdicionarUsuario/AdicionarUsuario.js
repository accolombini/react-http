import React, { Component } from 'react'

import './AdicionarUsuario.css'

const INITIAL_STATE = { 
  usuario: { nome: '', sobrenome: '', email: '' } 
}

class AdicionarUsuario extends Component {

  constructor(props) {
    super(props)

    this.state = INITIAL_STATE  // Para manter sempre o estado inicial. Todos os testes serão zerados

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler(event) {
    const { name, value } = event.target
    this.setState({ usuario: { ...this.state.usuario, [name]: value } })
  }

  onSubmitHandler(event) {  // Criando o método POST
    event.preventDefault()
   
    const usuario = this.state.usuario

    fetch('https://reqres.in/api/users', {  // Chamando a API e passando a requisição POST
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    })
      .then(resposta => resposta.json())
      .then(dados => {
        this.setState(INITIAL_STATE)
        this.props.adicionarUsuario(dados)
      })
  }

  render() {
    return (
      <div className="AdicionarUsuario">
        <h2>Adicionar Usuário</h2>
        <form onSubmit={this.onSubmitHandler}>
          <div className="Linha">
            <div className="Coluna">
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={this.state.usuario.nome}
                onChange={this.onChangeHandler}
                required>
              </input>
            </div>
            <div className="Coluna">
              <label>Sobrenome</label>
              <input
                type="text"
                name="sobrenome"
                value={this.state.usuario.sobrenome}
                onChange={this.onChangeHandler}
                required>
              </input>
            </div>
          </div>
          <div className="Linha">
            <div className="Coluna">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={this.state.usuario.email}
                onChange={this.onChangeHandler}
                required>
              </input>
            </div>
          </div>
          <button type="submit">
            Adicionar
        </button>
        </form>
      </div>
    )
  }
}

export default AdicionarUsuario