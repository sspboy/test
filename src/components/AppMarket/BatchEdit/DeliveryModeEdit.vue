<template>
  <div class="edit-form-box">
    <h3 class="font_size_12" style="margin-bottom: 12px;">编辑发货模式</h3>
    <a-form layout="vertical" class="font_size_12">
      <a-form-item label="发货模式">
        <a-radio-group v-model:value="form.value">
          <a-radio value="1">现货</a-radio>
          <a-radio value="2">现货+预售</a-radio>
        </a-radio-group>
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
  name: 'DeliveryModeEdit',
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
