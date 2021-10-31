export default {
  callThePokemon: ({ commit }, id) => {
    console.log('I make the call here')
    commit('update_pokemon', 'hello ' + id)
  },
}
