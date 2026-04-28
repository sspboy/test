<!-- 
 ###模板说明::网络图片上传组件
 1.组件命名规范：驼峰命名法，首字母大写，如：MyComponent.vue
 2、当前组件的父组件为：AppMarket/materialmanage
 3、当前组件的子组件为：无
 4、当前组件的功能：网络图片上传组件

 folder_id String 是 2 文件夹id，0为根目录
	url String 否 http://xxx.xxx、图片url，必须是公网可访问。url和file_uri二选一，不能同时为空，如果2者都不为空取url
	material_name String 是 图片名称.jpg 图片名称，开发者自定义，不得超过50个字符。
	file_uri String 否 tos-cn-i-7veqoeduo3/9e1df78157524c63abf7caa9bb1e88e0 二进制文件对应的uri，获取方式请参考：https://op.jinritemai.com/docs/guide-docs/171/1719
	need_distinct Bool 否 true 是否去重，默认true:去重，不支持false:不去重，传false无效依旧会去重。去重是指：存在已经审核通过且内容相同的图片，直接返回已存在的图片地址。
 --
 参数说明：
    1、props参数说明：
    - treeData：类型为Object，描述：父组件传递的树形数据对象，用于初始化级联选择器。
    2、事件说明：
    - 无
-->
<template>
    <!-- 上传网络图片 弹出层 开始-->
    <a-modal 
        v-model:open="netImageModalVisible" 
        title="上传网络图片"
        @ok="handleNetImageOk"
        @cancel="handleNetImageCancel"
    >
        <a-form 
            ref="netImageFormRef"
            :model="netImageForm"
            :rules="netImageRules"
            layout="vertical"
            style="padding: 20px 0 0 0;"
        >

            <a-form-item label="选择文件夹" name="folderId">
                <a-cascader
                    v-model:value="netImageForm.folderId"
                    :options="netImageFolderOptions"
                    :load-data="loadNetImageFolder"
                    placeholder="请选择素材文件夹"
                    change-on-select
                />
            </a-form-item>
            
            <div style="margin-bottom: 16px;">

               <label style="display: block; margin: 0 0 8px 0;font-size: 12px;">
                    <span style="color: #ff4d4f;">*</span> 图片地址 
                </label>

                <div v-for="(url, index) in netImageForm.imageUrls" :key="index" style="margin-bottom: 8px;">
                        <a-form-item
                            :name="['imageUrls', index]"
                            :rules="[
                                { required: true, message: '请输入图片地址', trigger: 'blur' },
                                { pattern: /^http/, message: '图片地址必须以 http 开头', trigger: 'change' }
                            ]"
                            style="margin-bottom: 0;"
                        >
                            <a-row>
                                <a-col :span="20">
                                    <a-input 
                                        v-model:value="netImageForm.imageUrls[index]"
                                        :placeholder="'请输入图片地址'"
                                        size="middle"
                                        autoComplete="off"
                                    />
                                </a-col>
                                <a-col :span="4">
                                    <a-button 
                                        type="dashed" 
                                        size="small"
                                        @click="removeImageUrl(index)"
                                        style="margin: 2px 0 0 10px;width: 80%;"
                                    >
                                    删除
                                    </a-button>
                                </a-col>

                            </a-row>

                            
                        </a-form-item>

                </div>
                <div >
                    <a-button 
                        type="dashed" 
                        size="small"
                        @click="addImageUrl"
                        :disabled="netImageForm.imageUrls.length >= 10"
                        style="margin: 18px 0 18px 0;"
                    >
                        <PlusOutlined /> 添加地址
                    </a-button>
                    <span v-if="netImageForm.imageUrls.length >= 10" style="color: #ff4d4f; font-size: 12px; margin-left: 8px;">
                        最多添加10个图片地址
                    </span>
                </div>
            </div>
        </a-form>
    </a-modal>
    <!-- 上传网络图片 弹出层 结束-->
</template>
<script>
import { ref, reactive } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

export default {
   name:'NetWorkImageUpload',
   components:{
      PlusOutlined
   },
   props: {
      treeData: {
         type: Object,
         default: () => ({ value: [] })
      }
   },
   setup(props) {

      const tool = new TOOL.TOOL();
      const API = new utils.A_Patch();

      const netImageModalVisible = ref(false);            // 上传网络图片弹出层状态
      const netImageFormRef = ref(null);                  // 网络图片表单 ref
      // 联级选择器文件夹选项
      const netImageFolderOptions = ref([]);

      // 网络图片表单数据
      const netImageForm = reactive({
         folderId: [],
         imageUrls: ['']
      });

      // 网络图片表单验证规则
      const netImageRules = {
         folderId: [
            { required: true, message: '请选择素材文件夹', trigger: 'change', type: 'array' }
         ]
      };

      // 将 treeData 转换为 Cascader 选项
      const convertTreeToCascader = (nodes) => {
         if (!nodes || nodes.length === 0) return [];
         return nodes.map(node => ({
            value: String(node.key),
            label: node.title,
            isLeaf: node.isLeaf,
            children: node.children ? convertTreeToCascader(node.children) : undefined
         }));
      };

      // 显示上传网络图片弹出层
      const showNetImageModal = () => {

         netImageModalVisible.value = true;
         
         // 初始化文件夹选项（添加根节点素材库）
         const treeValue = props.treeData?.value || [];
         
         if (treeValue.length > 0) {

            netImageFolderOptions.value = [{
               value: '0',
               label: '素材库',
               isLeaf: false,
               children: convertTreeToCascader(treeValue)
            }];

         }
      };

      // 添加图片地址输入框
      const addImageUrl = () => {
         if (netImageForm.imageUrls.length < 10) {
            netImageForm.imageUrls.push('');
         }
      };

      // 删除图片地址输入框
      const removeImageUrl = (index) => {
         if (netImageForm.imageUrls.length > 1) {
            netImageForm.imageUrls.splice(index, 1);
         }
      };

      // 确认上传网络图片
      const handleNetImageOk = () => {
         netImageFormRef.value.validate().then(() => {
            const folderId = netImageForm.folderId[netImageForm.folderId.length - 1];
            const urls = netImageForm.imageUrls.filter(url => url.trim() !== '');
            console.log('选择的文件夹ID：', folderId);
            console.log('网络图片地址列表：', urls);
            netImageModalVisible.value = false;
            // 重置表单
            netImageForm.folderId = [];
            netImageForm.imageUrls = [''];
         }).catch((error) => {
            console.log('表单验证失败', error);
         });
      };

      // 取消上传网络图片
      const handleNetImageCancel = () => {
         netImageModalVisible.value = false;
         netImageForm.folderId = [];
         netImageForm.imageUrls = [''];
      };

      // 异步加载联级选择器子文件夹
      const loadNetImageFolder = (selectedOptions) => {
         const targetOption = selectedOptions[selectedOptions.length - 1];
         targetOption.loading = true;
         
         const folderId = targetOption.value;
         
         tool.Http_.post(API.AppSrtoreAPI.material.getfolder, {
            "folder_id": folderId,
            "page_num": 1,
            "page_size": 10
         }).then((res) => {
            const child_folder_list = res.data.data.folder_info.child_folder;
            
            if (child_folder_list.length > 0) {
                  targetOption.children = child_folder_list.map(obj => ({
                     value: String(obj.folder_id),
                     label: obj.folder_name,
                     isLeaf: true
                  }));
                  
                  // 检查子文件夹是否还有子文件夹
                  const checks = targetOption.children.map(child => {
                     return tool.Http_.post(API.AppSrtoreAPI.material.getfolder, {
                        "folder_id": child.value,
                        "page_num": 1,
                        "page_size": 10
                     }).then((childRes) => {
                        const grandChildren = childRes.data.data.folder_info.child_folder;
                        child.isLeaf = grandChildren.length === 0;
                     });
                  });
                  
                  Promise.all(checks).then(() => {
                     targetOption.loading = false;
                     netImageFolderOptions.value = [...netImageFolderOptions.value];
                  });
            } else {
                  targetOption.isLeaf = true;
                  targetOption.loading = false;
                  netImageFolderOptions.value = [...netImageFolderOptions.value];
            }
         });
      };

      return {
         netImageModalVisible,
         netImageFormRef,
         netImageForm,
         netImageRules,
         netImageFolderOptions,
         showNetImageModal,
         handleNetImageOk,
         handleNetImageCancel,
         addImageUrl,
         removeImageUrl,
         loadNetImageFolder
      };
   }
}
</script>
<style scoped>
</style>
