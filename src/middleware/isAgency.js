export default function ({ $auth, redirect }, next) {
  console.log($auth.user.role)
  if (!$auth.user.role.includes('agency')) {
    redirect('/error')
  }
  next()
}
