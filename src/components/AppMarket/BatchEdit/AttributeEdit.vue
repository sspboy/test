<template>
  <div class="edit-form-box">
    <h3 class="font_size_12" style="margin-bottom: 12px;">编辑属性</h3>
    <a-form layout="vertical" class="font_size_12">
      <a-form-item label="属性名">
        <a-input v-model:value="form.name" placeholder="请输入属性名" allowClear />
      </a-form-item>
      <a-form-item label="属性值">
        <a-input v-model:value="form.value" placeholder="请输入属性值" allowClear />
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
  name: 'AttributeEdit',
  setup() {
    const form = reactive({ name: undefined, value: undefined });
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
