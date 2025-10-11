<!--抖音-选择图片、上传图片、本地上传图片 组件-->
<template>

    <a-drawer
        v-model:open="props.data.selectimg_open"
        title="选择图片"
        width="60%"
        :closable="false"
        :footer-style="{ textAlign: 'left' }"
        @close="onClose"
    >
    
        <div>
                <a-space>
                    <!--本地上传图片 按钮-->
                    <a-button type="primary" @click="showChildrenDrawer">本地上传</a-button>
                    <!--网络地址上传图片 按钮-->
                    <a-button @click="showChildnetDrawer">网络地址上传</a-button>
                </a-space>
        </div>

            <a-drawer v-model:open="childrenDrawer" title="本地上传" width="320" :closable="false">

                <a-button type="primary" @click="showChildrenDrawer">This is two-level drawer</a-button>

            </a-drawer>

            <a-drawer v-model:open="childnetDrawer" title="网络地址上传" width="320" :closable="false">

                <a-button type="primary" @click="showChildnetDrawer">This is two-level drawer</a-button>

            </a-drawer>


        <!--底部按钮-->
        <template #footer>

            <a-button style="margin-right: 8px" type="primary" @click="onClose">确认</a-button>

            <a-button  @click="onClose">取消</a-button>
            
        </template>

    </a-drawer>

</template>

<script>
import { defineComponent,ref,reactive,onMounted,h } from 'vue';
import { useStore } from 'vuex'
// 组件引用=====开始
export default defineComponent({
   name:'Materialplus',
   components:{
   },
    props: {
        data:{typr:Object}
    },
    setup(props,ctx) {


        console.log(props)


        const open = ref(false);
        const childrenDrawer = ref(false); // 本地上传
        const childnetDrawer = ref(false);// 网络上传
        const showDrawer = () => {
            open.value = true;
        };

        // 关闭选择素材抽屉
        const onClose = () => {
            props.data.selectimg_open = false;
        };

        // 显示本地上传
        const showChildrenDrawer = () => {
            childrenDrawer.value = !childrenDrawer.value;
        };
        // 显示网络上传
        const showChildnetDrawer = () => {
            childnetDrawer.value = !childnetDrawer.value;
        };


        return{
            open,
            props,
            childrenDrawer,
            childnetDrawer,
            showDrawer,
            onClose,
            showChildrenDrawer,
            showChildnetDrawer
        }
    }
})
</script>
<style scoped>
</style>