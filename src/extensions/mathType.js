export default {
  methods: {
    mathTypeDisplay(content) {
      // eslint-disable-next-line no-undef
      if (process.browser && WirisPlugin.currentInstance) {
        // process.browser : chỉ client mới chạy vô
        // eslint-disable-next-line no-undef
        return WirisPlugin.Parser.initParse(content)
      }
      return null
    },
  },
}
