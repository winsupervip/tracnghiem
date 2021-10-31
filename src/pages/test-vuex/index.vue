<template>
  <div>
    <h3>Hello Vuex: {{ bidule }}</h3>
    <button @click="callPokemonFromDemo(123)">Click me if you can</button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  auth: false,
  computed: {
    ...mapGetters({
      bidule: 'getHelloThere',
    }),
  },
  mounted() {
    console.log('bidule', this.bidule)
    this.callPokemonFromDemo('1')
  },
  methods: {
    ...mapActions({
      callPokemonFromDemo: 'callThePokemon',
    }),
  },
}
</script>
