import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { get, range, rangeRight } from 'lodash'
import { addUser, updateUser } from '../../modules/users'

import MaskedInput from 'react-maskedinput'

const months = {
  ids: range(1, 13),
  1: {
    name: 'Январь',
    days: range(1, 32),
  },
  2: {
    name: 'Февраль',
    days: range(1, 30),
  },
  3: {
    name: 'Март',
    days: range(1, 32),
  },
  4: {
    name: 'Апрель',
    days: range(1, 31),
  },
  5: {
    name: 'Май',
    days: range(1, 32),
  },
  6: {
    name: 'Июнь',
    days: range(1, 31),
  },
  7: {
    name: 'Июль',
    days: range(1, 32),
  },
  8: {
    name: 'Август',
    days: range(1, 32),
  },
  9: {
    name: 'Сентябрь',
    days: range(1, 31),
  },
  10: {
    name: 'Октябрь',
    days: range(1, 32),
  },
  11: {
    name: 'Ноябрь',
    days: range(1, 31),
  },
  12: {
    name: 'Декабрь',
    days: range(1, 32),
  },
}

const currentYear = (new Date()).getFullYear()
const years = rangeRight(currentYear - 100, currentYear - 10)

class SaveUserForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: props.user || {
        name     : '',
        birthday : [ '', '', '' ],
        address  : '',
        city_id  : 1,
        phone    : '',
      },
      validation: {
        name: undefined,
        birthday: undefined,
        phone: undefined,
      }
    }
  }

  componentWillMount() {
    this.validateFields()
  }

  validateFields = () => {
    const { name, phone, birthday: [ day, month, year ] } = this.state.data

    this.setState({
      validation : {
        name : name.length > 100
                ? 'Имя пользователя не должно быть длиннее 100 символов'
                : name.length === 0
                  ? 'Имя не может быть пустым'
                  : undefined,

        birthday : (day && month && year) ? undefined : 'Вы должны указать дату рождения',
        phone    : phone.length === 0
                    ? undefined
                    : phone.indexOf('_') >= 0
                      ? 'Введите номер до конца'
                      : undefined,
      }
    })
  }

  setData = (data, callback) => {
    this.setState({ data: { ...this.state.data, ...data } }, callback)
  }

  setBirthday = birthday => {
    this.setData({ birthday }, this.validateFields)
  }

  onSelectDay = event => {
    const day = parseInt(event.target.value, 10)
    const [ , month, year ] = this.state.data.birthday
    this.setBirthday([ day, month, year ])
  }

  onSelectMonth = event => {
    const month = parseInt(event.target.value, 10)
    const [ day, , year ] = this.state.data.birthday
    this.setBirthday([ day, month, year ])
  }

  onSelectYear = event => {
    const year = parseInt(event.target.value, 10)
    const [ day, month ] = this.state.data.birthday
    this.setBirthday([ day, month, year ])
  }

  onChangeName    = event => this.setData({ name    : event.target.value }, this.validateFields)
  onChangeAddress = event => this.setData({ address : event.target.value })
  onChangePhone   = event => this.setData({ phone   : event.target.value }, this.validateFields)
  onSelectCity    = event => this.setData({ city_id : parseInt(event.target.value, 10) })

  onClickToSave = event => {

    if (
           this.state.validation.name
        || this.state.validation.birthday
        || this.state.validation.phone
    ) {
      alert('Пожалуйста, исправьте ошибки в форме и повторите попытку.')
      return
    }

    const id = get(this.props, 'match.params.id')

    if (id) {
      this.props.updateUser(id, this.state.data)
    } else {
      this.props.addUser(this.state.data)
    }

    this.props.gotoUsersList()
  }

  render() {
    const { match : { params: { id } }, user, cities } = this.props
    const {
      validation,
      data: {
        name,
        address,
        city_id,
        phone,
        birthday : [ day, month, year ],
      },
    } = this.state

    return (
      <div className="user-edit--container">
        <fieldset className="form">
          <legend>{id ? `Редактирование пользователя ${user.name}` : 'Новый пользователь'}</legend>

          <div className="form-item">
            <label>
              Имя
              { validation.name &&
                <span className="error">{validation.name}</span>
              }
            </label>
            <input placeholder="Иванов Иван Иванович" value={name} type="text" name="user_name" onChange={this.onChangeName} />
          </div>

          <label>
            Дата рождения
            { validation.birthday &&
              <span className="error">{validation.birthday}</span>
            }
          </label>
          <div className="row gutters">
            <div className="col col-3">
              <div className="form-item">
                <select value={day} name="day" onChange={this.onSelectDay}>
                  <option key="0" value="0">День</option>
                  {months[month || 1].days.map(day =>
                    <option key={day} value={day}>{day}</option>
                  )}
                </select>
                <div className="desc">День</div>
              </div>
            </div>
            <div className="col col-3">
              <div className="form-item">
                <select value={month} name="month" onChange={this.onSelectMonth}>
                  <option key="0" value="0">Месяц</option>
                  { months.ids.map(id =>
                    <option key={id} value={id}>{months[id].name}</option>
                  ) }
                </select>
                <div className="desc">Месяц</div>
              </div>
            </div>
            <div className="col col-6">
              <div className="form-item">
                <select value={year} name="year" onChange={this.onSelectYear}>
                  <option key="0" value="0">Год</option>
                  { years.map(year =>
                    <option key={year} value={year}>{year}</option>
                  ) }
                </select>
                <div className="desc">Годы</div>
              </div>
            </div>
          </div>

          <div className="form-item">
            <label>Город</label>
            <select value={city_id} name="year" onChange={this.onSelectCity}>
              { cities.ids.map(id =>
                <option key={id} value={id}>{cities[id].name}</option>
              ) }
            </select>
          </div>

          <div className="form-item">
            <label>Адрес</label>
            <input placeholder="ул. Тверская, 12" value={address} type="text" name="address" onChange={this.onChangeAddress} />
          </div>

          <div className="form-item">
            <label>
              Телефон
              { validation.phone &&
                <span className="error">{validation.phone}</span>
              }
            </label>
            <MaskedInput mask="+7 (111) 111-11-11" name="phone" value={phone} placeholder="+7 (903) 123 45 67" onChange={this.onChangePhone}/>
          </div>

        </fieldset>
        <button onClick={this.onClickToSave}>Сохранить</button>
        <button className="button outline" onClick={this.props.gotoUsersList}>Отмена</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {

  const id = get(props, 'match.params.id')

  return ({
    user   : state.users[id],
    cities : state.cities,
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addUser,
  updateUser,
  gotoUsersList : () => push('/users'),
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveUserForm)
