export default function (req, res, next) {
  // Adds a minimum 30 seconds for Varnish to cache Nuxt responses.
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate')
  next()
}