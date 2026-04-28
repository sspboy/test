<template>
  <div class="edit-form-box">
    <h3 class="font_size_12" style="margin-bottom: 12px;">编辑主图</h3>
    <a-form layout="vertical" class="font_size_12">
      <a-form-item label="上传新主图">
        <a-upload list-type="picture-card" :max-count="5">
          <div>
            <PlusOutlined />
            <div style="margin-top: 8px">上传</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" size="small">保存修改</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { PlusOutlined } from '@ant-design/icons-vue';
export default {
  name: 'MainImageEdit',
  components: { PlusOutlined }
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
