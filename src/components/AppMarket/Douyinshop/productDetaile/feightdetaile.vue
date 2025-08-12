<!-- 运费详情 组件-->
<template>
    <div>
        <a-drawer
            title="运费详情"
            v-model:open="props.data.open"
            root-class-name="root-class-name"
            :root-style="{ color: 'blue' }"
            size="large"
            style="color: #666"
            width="50%"
            placement="right"
        >
            <div>
                <p>运费：{{ props.data.data }}</p>

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

        console.log(props.data.data)

    
        return{
            props,
            visible:ref(false),
        }
    }
    })
</script>

