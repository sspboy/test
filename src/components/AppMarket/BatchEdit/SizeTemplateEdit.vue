<template>
  <div class="edit-form-box">
    <h3 class="font_size_12" style="margin-bottom: 12px;">编辑尺码模板</h3>
    <a-form layout="vertical" class="font_size_12">
      <a-form-item label="选择尺码模板">
        <a-select v-model:value="form.value" placeholder="请选择尺码模板" allowClear>
          <a-select-option value="1">模板A</a-select-option>
          <a-select-option value="2">模板B</a-select-option>
        </a-select>
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
  name: 'SizeTemplateEdit',
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
