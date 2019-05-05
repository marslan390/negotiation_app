/**
* This is dummy store, which would use for the testing
* */
const state = {
  temperature: '10'
}

const getters = {
  temperature: state => state.temperature
}

const actions = {
  fetchTemperature: jest.fn()
}

const mutations = {
  setTemperature: (state, temperature) => (state.temperature = temperature)
}

export default {
  state,
  getters,
  actions,
  mutations
}
