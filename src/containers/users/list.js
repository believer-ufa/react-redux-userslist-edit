import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeUser } from '../../modules/users'

class UsersList extends React.Component {

  onClickToRemoveUser = id => {
    if (window.confirm('Вы действительно желаете удалить данного пользователя?')) {
      this.props.removeUser(id)
    }
  }

  render() {

    const { users, cities } = this.props || {}

    return (
      <div className="users-list--container">
        <h3>Список пользователей</h3>

        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Адрес</th>
              <th>Дата рождения</th>
              <th>Город</th>
              <th>Телефон</th>
              <th className="text-small">Редактирование</th>
            </tr>
          </thead>
          <tbody>
            {users.ids.map(id =>
              <tr key={id}>
                <td>{users[id].name}</td>
                <td>{users[id].address}</td>
                <td>{users[id].birthday[0]}.{users[id].birthday[1]}.{users[id].birthday[2]}</td>
                <td>{cities[users[id].city_id].name}</td>
                <td>{users[id].phone}</td>
                <td>
                  <button onClick={() => this.onClickToRemoveUser(id)} className="button outline small">Удалить</button>
                  <button onClick={() => this.props.editUser(id)} className="button outline small">Изменить</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button onClick={this.props.newUser}>Добавить</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  cities: state.cities,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  editUser: id => push(`/users/edit/${id}`),
  newUser: id => push(`/users/create`),
  removeUser,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList)
