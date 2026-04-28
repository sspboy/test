<template>
  <div class="edit-form-box">
    <h3 class="font_size_12" style="margin-bottom: 12px;">编辑SKU编码</h3>
    <a-form layout="vertical" class="font_size_12">
      <a-form-item label="查找文字">
        <a-input v-model:value="form.target" placeholder="输入要查找的SKU编码" allowClear />
      </a-form-item>
      <a-form-item label="替换为">
        <a-input v-model:value="form.replace" placeholder="输入新的SKU编码" allowClear />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" size="small">保存修改</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { reactive } from 'vue';
export default {
  name: 'SkuCodeEdit',
  setup() {
    const form = reactive({ target: undefined, replace: undefined });
    return { form };
  }
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
