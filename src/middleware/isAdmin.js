export default function ({ $auth, redirect }, next) {
  console.log($auth.user.role)
  if (!$auth.user.role.includes('admin')) {
    redirect('/error')
  }
  next()
}
