<!-- 运费详情 组件-->
<template>
    <div>
        <a-drawer
            title="运费详情"
            width="50%"
            :after-close="afterClose"
        >
            <div>
                <p>运费：{{ props.data.feight }}</p>
            </div>
        </a-drawer>
    </div>
</template>

<script>
import { defineComponent,ref } from 'vue';

export default defineComponent({

    name: "feightdetaile",  // 运费详情组件
    // 引用组件
    components: {

    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },
    
    setup(props, ctx) {
    
        return{
            visible:ref(false),
        }
    }
    })
</script>

