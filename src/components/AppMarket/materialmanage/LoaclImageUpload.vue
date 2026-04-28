<!-- 
 ###模板说明::
 本地图片上传组件::
 支持单张图片上传，且单个图片最大不能超过10M；支持的格式有：png/jpg；
 支持多张图片上传，且单个图片最大不能超过10M；支持的格式有：png/jpg；
 3、接口上传成功，素材中心会对素材进行异步审核，审核时效：非风险图片99%在4s内完成审核，风险图片我们会在24h内审核完成；对于审核失败的素材，素材中心会在一定时间内将其删除。
 4、上传时需要关注文件夹属性，只有0（文件夹）和1（图片文件夹）才可以上传图片。文件夹属性可通过【/material/getFolderInfo】和【/material/searchFolder】查看；
 5、2022年11月-素材接口字段变更公告：https://op.jinritemai.com/docs/notice-docs/5/2668 响应参数ByteUrl字段废弃；只有AuditStatus=3时ByteUrl才会返回；
 6、2024年8月，增加限流控制，商家维度每秒不能超过1000张图片
 7、图片链接不支持ipv4，不支持内网域名
 -----
 1.组件命名规范：驼峰命名法，首字母大写，如：MyComponent.vue
 2、当前组件的父组件为：AppMarket/materialmanage
 3、当前组件的子组件为：无
 4、当前组件的功能：本地图片上传组件
 --
 参数说明：
    1、props参数说明：
    - data：类型为Object，描述：父组件传递的数据对象，包含以下属性：
        - imageUrl：类型为String，描述：图片的URL地址，用于显示和上传图片。
        - otherProperty：类型为String，描述：其他相关属性，根据实际需求添加。
    2、事件说明：
    3、且单个图片最大不能超过10M；支持的格式有：png/jpg；
    - 无
-->
<template>
    <!-- 上传本地文件 弹出层 开始-->
    <a-modal 
        v-model:open="localUploadModalVisible" 
        title="上传本地文件"
        @ok="handleLocalUploadOk"
        @cancel="handleLocalUploadCancel"
        :width="560"
    >
        <a-upload-dragger
            v-model:fileList="localFileList"
            :multiple="true"
            :beforeUpload="beforeLocalUpload"
            :customRequest="handleLocalUpload"
            @change="handleLocalUploadChange"
            style="margin: 30px 0 20px 0;"
        >
            <p class="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p class="ant-upload-text">点击或拖拽文件到此处上传</p>
            <p class="ant-upload-hint">
                支持单次上传多个文件，文件大小不超过5MB，最多20个文件
            </p>
        </a-upload-dragger>
    </a-modal>
    <!-- 上传本地文件 弹出层 结束-->
</template>
<script>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { InboxOutlined } from '@ant-design/icons-vue';

export default {
    name: 'LoaclImageUpload',
    components: {
        InboxOutlined
    },
    setup() {
        // 上传本地文件弹出层状态
        const localUploadModalVisible = ref(false);
        const localFileList = ref([]);

        // 显示上传本地文件弹出层
        const showLocalUploadModal = () => {
            localUploadModalVisible.value = true;
        };

        // 本地文件上传前验证
        const beforeLocalUpload = (file, fileList) => {
            const MAX_SIZE = 5 * 1024 * 1024; // 5MB
            const MAX_COUNT = 20;

            // 文件大小验证
            if (file.size > MAX_SIZE) {
                message.error(`文件 ${file.name} 超过5MB限制`);
                return false;
            }

            // 单次上传数量验证
            if (file === fileList[0] && fileList.length > MAX_COUNT) {
                message.error(`一次最多上传${MAX_COUNT}个文件`);
                return false;
            }

            return true;
        };

        // 自定义上传请求
        const handleLocalUpload = ({ file, onSuccess, onError }) => {
            console.log('上传触发，文件信息：', {
                name: file.name,
                size: file.size,
                type: file.type
            });
            
            // 模拟上传过程（实际项目中应替换为真实上传接口）
            setTimeout(() => {
                onSuccess('ok');
            }, 500);
        };

        // 上传状态变化处理
        const handleLocalUploadChange = (info) => {
            const status = info.file.status;
            if (status === 'done') {
                message.success(`${info.file.name} 上传成功`);
            } else if (status === 'error') {
                message.error(`${info.file.name} 上传失败`);
            }
        };

        // 确认关闭上传弹窗
        const handleLocalUploadOk = () => {
            localUploadModalVisible.value = false;
            localFileList.value = [];
        };

        // 取消关闭上传弹窗
        const handleLocalUploadCancel = () => {
            localUploadModalVisible.value = false;
            localFileList.value = [];
        };

        return {
            localUploadModalVisible,
            localFileList,
            showLocalUploadModal,
            beforeLocalUpload,
            handleLocalUpload,
            handleLocalUploadChange,
            handleLocalUploadOk,
            handleLocalUploadCancel
        };
    }
}
</script>
<style scoped>
</style>
