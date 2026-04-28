<template>
  <div class="edit-form-box">
    <h3 class="font_size_12" style="margin-bottom: 12px;">编辑限购策略</h3>
    <a-form layout="vertical" class="font_size_12">
      <a-form-item label="每人限购数量">
        <a-input-number v-model:value="form.limit" :min="0" placeholder="0为不限购" style="width: 200px;" />
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
  name: 'PurchaseLimitEdit',
  setup() {
    const form = reactive({ limit: undefined });
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
