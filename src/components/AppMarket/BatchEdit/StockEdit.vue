<template>
  <div class="edit-form-box">
    <h3 class="font_size_12" style="margin-bottom: 12px;">编辑库存</h3>
    <a-form layout="vertical" class="font_size_12">
      <a-form-item label="新库存数量">
        <a-input-number v-model:value="form.stock" :min="0" placeholder="请输入库存数量" style="width: 200px;" />
      </a-form-item>
      <a-form-item label="修改方式">
        <a-radio-group v-model:value="form.type">
          <a-radio value="1">直接修改</a-radio>
          <a-radio value="2">增加</a-radio>
          <a-radio value="3">减少</a-radio>
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
  name: 'StockEdit',
  setup() {
    const form = reactive({ stock: undefined, type: '1' });
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
