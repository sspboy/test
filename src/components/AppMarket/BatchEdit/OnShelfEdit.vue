<template>
  <div class="edit-form-box">
    <h3 class="font_size_12" style="margin-bottom: 12px;">编辑上架</h3>
    <a-form layout="vertical" class="font_size_12">
      <a-form-item label="上架状态">
        <a-radio-group v-model:value="form.status">
          <a-radio value="1">立即上架</a-radio>
          <a-radio value="2">定时上架</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="form.status === '2'" label="定时上架时间">
        <a-date-picker v-model:value="form.time" show-time placeholder="选择时间" />
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
  name: 'OnShelfEdit',
  setup() {
    const form = reactive({ status: '1', time: undefined });
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
