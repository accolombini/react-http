import React, { Component } from 'react'

import AdicionarUsuario from '../AdicionarUsuario/AdicionarUsuario'
import Usuario from '../Usuario/Usuario'

class Usuarios extends Component {

  constructor(props) {
    super(props)
    this.state = { usuarios: [] }

    this.adicionarUsuario = this.adicionarUsuario.bind(this)
  }

  adicionarUsuario(usuario) {
    const usuarios = [...this.state.usuarios, usuario]
    this.setState({ usuarios: usuarios })
  }

  removerUsuario(usuario) {  // Método DELETE
    if (window.confirm(`Tem certeza que deseja remover "${usuario.nome} ${usuario.sobrenome}"?`)) {
      fetch(`https://reqres.in/api/users/${usuario.id}`, {
        method: 'DELETE'
      })
        .then(resposta => {
          if (resposta.ok) {
            let usuarios = this.state.usuarios
            usuarios = usuarios.filter(x => x.id !== usuario.id)
            this.setState({ usuarios: usuarios })
          }
        })
    }
  }

  componentDidMount() {

    fetch('https://reqres.in/api/users')  // Estamos utilizando fetch para realizar uma requisição GET
      .then(resposta => resposta.json())  // Para converter para .json
      .then(dados => {
        const usuarios = dados.data.map(usuario => ({  // Mapeamento necessário para ajustar com a API que está sendo utilizada
          id: usuario.id,
          nome: usuario.first_name,
          sobrenome: usuario.last_name,
          email: usuario.email
        }))

        this.setState({ usuarios })  // Atualização do estado
      })
  }

  render() {
    return (
      <>
        <AdicionarUsuario adicionarUsuario={this.adicionarUsuario} />

        {this.state.usuarios.map(usuario => (
          <Usuario key={usuario.id}
            usuario={usuario}
            removerUsuario={this.removerUsuario.bind(this, usuario)}
          />
        ))}
      </>
    )
  }
}

export default Usuarios