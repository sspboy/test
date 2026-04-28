<template>
  <div class="edit-form-box">
    <h3 class="font_size_12" style="margin-bottom: 12px;">删除商品</h3>
    <a-form layout="vertical" class="font_size_12">
      <a-form-item>
        <a-alert message="警告：删除后商品将无法恢复，请谨慎操作！" type="warning" show-icon />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" danger size="small">确认删除</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  name: 'DeleteProductEdit'
}
</script>
<style scoped>
.edit-form-box {
  background: #fff;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #f2f2f2;
}
</style>
