<template>
  <div class="edit-form-box">
    <h3 class="font_size_12" style="margin-bottom: 12px;">编辑标题</h3>
    <a-form layout="vertical" class="font_size_12">
      <a-form-item label="过滤关键字">
        <a-input v-model:value="form.filter_key" placeholder="输入标题中需要删除的关键字" allowClear />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-input v-model:value="form.target_key" placeholder="查找文字" style="width: 120px;" allowClear />
          <span>替换为</span>
          <a-input v-model:value="form.replace_key" placeholder="输入文字" style="width: 120px;" allowClear />
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-input v-model:value="form.after_key" placeholder="标题前缀" style="width: 120px;" allowClear />
          <span>原标题</span>
          <a-input v-model:value="form.before_key" placeholder="标题后缀" style="width: 120px;" allowClear />
        </a-space>
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
  name: 'TitleEdit',
  setup() {
    const form = reactive({
      filter_key: undefined,
      target_key: undefined,
      replace_key: undefined,
      after_key: undefined,
      before_key: undefined,
    });
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
