import axios from 'axios'

const state = {
  temperature: ''
}

const getters = {
  temperature: state => state.temperature
}

const actions = {
  async fetchTemperature ({ commit }) {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/find?q=London&units=metric&appid=89c02c28a31b133160cee5c25ed82a6e')
    const { data } = response
    if (data && data['list'] && data['list'].length > 0) {
      const temperature = data['list'][0]['main']['temp']
      commit('setTemperature', temperature)
    }
  }
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
