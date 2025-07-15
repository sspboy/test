<template>

    <div ref="myDiv" id="heheda"></div>
    <a-drawer :width="500" title="消息通知" placement="right" :open="props.data.mesPage" @close="onClose" >



        
        <a-layout-content style="padding: 20px 100px 0 100px;height: 100%;">



        </a-layout-content>

    </a-drawer>
</template>


<script>
import { defineComponent,ref,reactive,onMounted,onBeforeMount } from 'vue';
import * as TOOL from '@/assets/JS_Model/tool';

export default defineComponent({

    name: "message_page",  // 筛选条件查询组件
    // 引用组件
    components: {


    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {
        const tool = new TOOL.TOOL()            // 工具方法
        const myDiv = ref(null)

        onBeforeMount(async () => {
                try {
                    await tool.Fun_.loadScript('http://lf1-fe.ecombdstatic.com/obj/ecom-fe-open-public/component/index.js', {crossOrigin: 'anonymous'})

                    console.log('外部 JS 加载完成')
                    console.log(ecopen)
                    console.log(myDiv.value)

                } catch (e) {
                    console.error(e)
                }
                
                const ele = myDiv.value
                ecopen.bixi(ele, {
                    "appID":"583",
                    "shopId":"4463798",
                    "token":'CgYIASAHKAESXgpc6TJM+rLRpw9X9Q2CPR3CdM5/x7/aWk6MgWR0wGZJzviOjtUuKtsllfLb4Q7u4SxJ+/LyKGcfvAx9YHby8Gyua7fuUTT1XeJTwqu0HINqcalV5OieV6atzzu8Mn0aAA==',
                    "componentId": 317,
                })
        }
)



        onMounted(() => {
            // const script = document.createElement('script')
            // script.src = 'http://lf1-fe.ecombdstatic.com/obj/ecom-fe-open-public/component/index.js'
            // script.crossOrigin = 'anonymous'        // 如需要 CORS
            // script.onload = () => { /* 库已可用 */ }
            // document.head.appendChild(script)



        })



        // 确认按钮
        const handleOk = e => {
            console.log('确认');
        };

        // 关闭方法
        const onClose = () => {
            props.data.mesPage = false;
        };

        return{
            myDiv,
            props,
            handleOk,       // 查询时间
            onClose,        // 关闭时间
        }
    }
})
</script>
<style lang="less">
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>