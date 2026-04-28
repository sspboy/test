<template>
  <div class="edit-form-box">
    <h3 class="font_size_12" style="margin-bottom: 12px;">编辑售后服务</h3>
    <a-form layout="vertical" class="font_size_12">
      <a-form-item label="售后策略">
        <a-checkbox-group v-model:value="form.value">
          <a-checkbox value="1">7天无理由退货</a-checkbox>
          <a-checkbox value="2">运费险</a-checkbox>
          <a-checkbox value="3">假一赔三</a-checkbox>
        </a-checkbox-group>
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
  name: 'AfterSalesEdit',
  setup() {
    const form = reactive({ value: [] });
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
