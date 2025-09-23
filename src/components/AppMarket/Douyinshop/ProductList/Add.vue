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

                      <p>商品名称</p>


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