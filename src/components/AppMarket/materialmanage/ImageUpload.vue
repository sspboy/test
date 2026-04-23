<!-- 
 ###模板说明::
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
    - 无
-->
<template>

</template>
<script>
import { defineComponent,ref,reactive,onMounted,h } from 'vue';
import { useStore } from 'vuex'
// 组件引用=====开始
export default {
   name:'name',
   components:{
   },
props: {
   data:{typr:Object}
},
setup(props,ctx) {
       return{
       }
   }
}
</script>
<style scoped>
</style>