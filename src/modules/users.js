import { max } from 'lodash'

export const ADD = 'users/ADD'
export const REMOVE = 'users/REMOVE'
export const UPDATE = 'users/UPDATE'

const initialState = {
  ids: [ 1 ],
  1 : {
    id       : 1,
    name     : 'Роман',
    birthday : [ 22, 1, 1990 ],
    address  : 'ул. Гагарина',
    city_id  : 1,
    phone    : '+7 906 376 57 24',
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      const id = (max(state.ids) || 0) + 1
      return {
        ...state,
        ids  : [ ...state.ids, id ],
        [id] : action.data,
      }

    case REMOVE:
      const { ids, ...data } = state
      delete data[action.id]
      return {
        ids : state.ids.filter(checkedId => checkedId !== action.id),
        ...data,
      }

    case UPDATE:
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          ...action.data,
        }
      }
    default:
      return state
  }
}

export const addUser = data => {
  return {
    type: ADD,
    data,
  }
}

export const removeUser = id => {
  return {
    type: REMOVE,
    id,
  }
}

export const updateUser = (id, data) => {
  return {
    type: UPDATE,
    id,
    data
  }
}