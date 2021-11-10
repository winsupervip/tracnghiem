export default {
  methods: {
    mathTypeDisplay(content) {
      // eslint-disable-next-line no-undef
      return WirisPlugin.Parser.initParse(content)
    },
  },
}
