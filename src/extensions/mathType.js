export default {
  methods: {
    mathTypeDisplay(content) {
      // eslint-disable-next-line no-undef
      if (process.browser && WirisPlugin.currentInstance) {
        // process.browser : chỉ client mới chạy vô
        console.log('mathTypeDisplay :', content)
        // eslint-disable-next-line no-undef
        return WirisPlugin.Parser.initParse(content)
      }
      return null
    },
  },
}
