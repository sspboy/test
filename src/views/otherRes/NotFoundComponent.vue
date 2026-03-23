<template>
  <a-result status="404" title="404" style="margin: 10% auto;" sub-title="对不起,您访问的页面不存在。">
    <template #extra>
      <a-button type="primary" href="/introduction">返回首页</a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  // 找不到页面错误
  name: 'NotFoundComponent'
}
</script>