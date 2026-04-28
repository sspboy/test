<template>
  <div class="edit-form-box">
    <h3 class="font_size_12" style="margin-bottom: 12px;">编辑商品资质</h3>
    <a-form layout="vertical" class="font_size_12">
      <a-form-item label="上传资质文件">
        <a-upload>
          <a-button size="small"><PlusOutlined /> 上传文件</a-button>
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
  name: 'QualificationEdit',
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
