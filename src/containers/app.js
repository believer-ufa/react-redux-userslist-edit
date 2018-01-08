import React from 'react';
import { Route, NavLink } from 'react-router-dom'
import Home from './home'
import { UsersList, SaveUserForm } from './users'

const App = () => {
  return (
    <div className="app">
      <header>
        <NavLink exact activeClassName="active" to="/">О приложении</NavLink>
        <NavLink activeClassName="active" to="/users">Пользователи</NavLink>
      </header>

      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={UsersList} />
        <Route path="/users/create" component={SaveUserForm} />
        <Route path="/users/edit/:id" component={SaveUserForm} />
      </main>
    </div>
  )
}

export default App
