<template>
  <div class="edit-form-box">
    <h3 class="font_size_12" style="margin-bottom: 12px;">编辑价格</h3>
    <a-form layout="vertical" class="font_size_12">
      <a-form-item label="新售价（元）">
        <a-input-number v-model:value="form.price" :min="0" :precision="2" placeholder="请输入价格" style="width: 200px;" />
      </a-form-item>
      <a-form-item label="修改方式">
        <a-radio-group v-model:value="form.type">
          <a-radio value="1">直接修改</a-radio>
          <a-radio value="2">加价</a-radio>
          <a-radio value="3">减价</a-radio>
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
  name: 'PriceEdit',
  setup() {
    const form = reactive({ price: undefined, type: '1' });
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
