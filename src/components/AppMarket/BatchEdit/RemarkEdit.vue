<template>
  <div class="edit-form-box">
    <h3 class="font_size_12" style="margin-bottom: 12px;">编辑备注</h3>
    <a-form layout="vertical" class="font_size_12">
      <a-form-item label="新备注">
        <a-textarea v-model:value="form.value" :rows="3" placeholder="请输入新的商品备注" allowClear />
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
  name: 'RemarkEdit',
  setup() {
    const form = reactive({ value: undefined });
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
