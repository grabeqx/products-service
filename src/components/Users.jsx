import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import Box from '../containers/Box.jsx';
import Search from '../containers/Search';
import { getUsers, removeUser } from '../actions/apiCalls';

class Users extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    if(this.props.cookies.get('login').profile !== 'admin') {
      this.props.history.push(`/panel/${this.props.cookies.get('login').id}/home`);
    }
    this.props.getUsers().then((users) => {
      this.setState({
        users: users
      })
    })
  }

  search = (e) => {
    let users = this.state.users;
    let searchText = e.target.value.toUpperCase();
    users.map((user) => {
      var show = (user.id.toUpperCase().includes(searchText)) || (user.login.toUpperCase().includes(searchText)) || (user.company.toUpperCase().includes(searchText)) || (user.lastname.toUpperCase().includes(searchText));
      if(show) {
        user.hide = false;
      } else {
        user.hide = true;
      }
      return user;
    })
    this.setState({
      users: users
    });
  }

  remove = (e) => {
    e.persist();
    e.stopPropagation();
    let confirmValue = window.confirm('Usunąć urzytkownika?');
    if(confirmValue) {
      this.props.removeUser({
        id: e.target.dataset.id
      }).then(data => {
        if(data.status) {
          let users = this.state.users.filter(user => user.id !== e.target.dataset.id);
          this.setState({
            users: users
          })
        }
      })
    }
  }

  render() {
    return (
      <>
        <Search filterMethod={this.search} placeholder="Szukaj: id, login, nazwisko" />
        <Box title="Pracownicy" list size={100}>
          <div className="users-list-titles">
            <span className="size-1">Id</span>
            <span>Login</span>
            <span>Imie i nazwisko</span>
            <span>E-mail</span>
            <span>Telefon</span>
            <span>Typ</span>
          </div>
          {this.state.users.map((user) => (
            <div className="client-record" key={user.id}>
            <span className="user-link">
              <span className="size-1">{user.id}</span>
              <span>{user.login}</span>
              <span>{user.firstname} {user.lastname}</span>
              <span>{user.email}</span>
              <span>{user.tel}</span>
              <span>{user.profile === 'service' ? 'Serwisant' : user.profile === 'adder' ? 'Rejestrator' : 'Kordynator'}</span>
            </span>
            <button data-id={user.id} className="remove-client-btn" onClick={this.remove}>Usuń</button>
            </div>
          ))}
        </Box>
      </>
    )
  }
}

export default connect(null, {getUsers, removeUser})(withCookies(Users));