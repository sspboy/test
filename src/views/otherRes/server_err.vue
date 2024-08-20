<template>
  <a-result status="500" title="500" sub-title="对不起,服务器放生错误！">
    <template #extra>
      <a-button type="primary" href="/">返回首页</a-button>
    </template>
  </a-result>
</template>


<script>
export default {
  // 服务错误
  name: "server_err"
}
</script>

<style scoped>

</style>