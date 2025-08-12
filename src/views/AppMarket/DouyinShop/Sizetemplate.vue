<!-- 尺码模板 -->
 <template>
    <div></div>
</template>
<script>
import { defineComponent,ref,reactive,onMounted,h } from 'vue';
export default {
    namae:'sizetemplate',
    components:{

    },
    setup() {
        const PAGEDATA = reactive({
            title:'尺码模板',
        })
        const store = useStore();// 共享数据
        const innerHeight = ref(window.innerHeight-100);// 初始化表格高度

        const drawer = ref(false);

        return{
          PAGEDATA,
          store,
          innerHeight
        }
    }

}

</script>

<style scoped>

</style>
