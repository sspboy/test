<template>
  <a-result title="没有登录，无法访问!">
    <template #icon>
    </template>
    <template #extra>
      <router-link to="/"><a-button type="primary">去登录</a-button></router-link>
    </template>
  </a-result>
</template>

<script>
export default {
  name: "NotLoginPermissions"
}
</script>

<style scoped>

</style>