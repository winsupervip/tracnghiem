<template>
  <div>
    <h1>Admin dashboard</h1>
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
  auth: true,
  middleware: ['isAdmin'],
}
</script>
