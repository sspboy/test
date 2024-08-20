<template>
  <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
    <template #extra>
      <a-button type="primary">返回上一页</a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  // 暂无权限
  name: "NoPermissions"
}
</script>

<style scoped>

</style>