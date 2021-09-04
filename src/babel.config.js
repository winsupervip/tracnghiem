module.exports = {
  presets: [
    [
      '@nuxt/babel-preset-app',
      {
        useBuiltIns: 'entry',
        targets: { esmodules: true },
      },
    ],
  ],
}
