<!-- 抖店铺==新建商品组件 -->
<template>
    <a-modal
      v-model:open="props.data.AddDate"
      title="新建商品"
      width="100%"
      wrap-class-name="full-modal"
      @ok="handleOk"
    >
        <a-layout-content class="content">
            <div style="width: 950px;margin: 0 auto;">

                <a-divider orientation="left" orientation-margin="0px">图片信息</a-divider>
                <p>图片信息</p>
                <p>主图</p>
                <p>白底图</p>
                <p>3:4长图</p>
                <p>长图</p>
                <p>视频</p>

                <a-divider orientation="left" orientation-margin="0px">基础信息</a-divider>

                <p>标题--表单信息必填信息</p>

                <a-divider orientation="left" orientation-margin="0px">规格&库存</a-divider>
                <p>规格</p>
                <p>库存列表</p>

                <a-divider orientation="left" orientation-margin="0px">分类属性</a-divider>
                <p>分类</p>
                <p>属性</p>

                <a-divider orientation="left" orientation-margin="0px">描述详情</a-divider>
                <p>富媒体编辑框</p>

            </div>
        </a-layout-content>

    </a-modal>
</template>
<script>
import { defineComponent,ref,reactive,onMounted,h } from 'vue';
import { useStore } from 'vuex'

// 组件引用=====开始
export default defineComponent({
    name:'新建商品',
    components:{
    },
    props: {
        data:{typr:Object}
    },
    setup(props,ctx) {

        console.log(props.data.product_id)

        // 基础信息



        // 其他信息




        const handleOk = e => {
            console.log(e);
        };

        return{
            props,
            handleOk,
        }
    }
})

</script>
<style scoped>
</style>