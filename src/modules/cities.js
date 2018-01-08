const initialState = {
  ids: [ 1,2,3,4,5,6 ],
  1: {
    name: 'Уфа',
  },
  2: {
    name: 'Москва',
  },
  3: {
    name: 'Воронеж',
  },
  4: {
    name: 'Екатеринбург',
  },
  5: {
    name: 'Тарков',
  },
  6: {
    name: 'Санкт-Петербург',
  },
}

export default (state = initialState, action) => {
    return state
}