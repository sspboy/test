<template>
    <a-layout-header class="head">
      <div class="logo_text cursor">{{ PAGE.data.detaile?.brand_name }}</div>
      <div class="font_size_12 cursor" style="margin-left:20px;float: right; color: dimgray;">
        <LogoutOutlined style="margin: 0 3px;" />
        退出
      </div>
      <div class="font_size_12 cursor" style="float: right; color: dimgray;">
        <MehOutlined style="margin: 0 3px;" />
        {{ PAGE.data.detaile?.id }}
      </div>
    </a-layout-header>
</template>

<script>
import {defineComponent, computed, reactive} from 'vue';
import {LogoutOutlined, MehOutlined} from '@ant-design/icons-vue'
import {useStore} from 'vuex'

export default defineComponent({

  name: "menu_head",

  components: {
    LogoutOutlined,
    MehOutlined,
  },

  // 接受父组件数据
  props:{
    headdata:{
      type:Object // 数据类型效验
    }
  },

  setup(props){

    const store = useStore();// 共享数据
    const PAGE = reactive({
      data:{}
    })

    // 用户详情查询
    store.dispatch('user/get_user',{user_id:'xiaohaha'}).then(()=>{
      PAGE.data = store.state.user.message  // 页面赋值
    })


    // 列表===查询ok
    // const page_data = {
    //   "page":1,
    //   "page_size":10
    // }
    // store.dispatch('list', page_data).then(()=>{
    //   console.log(store.state.user.message)
    // })


    // 用户==添加ok
    // const add_data = {
    //     "account_type": 0,
    //     "id": "我12345",
    //     "v_id": 0,
    //     "nickname": "小小的天下",
    //     "pass_word": "123456",
    //     "brand_name": "meme",
    //     "mobile": "145480502223",
    //     "role": "{\"role\":[\"admin\"]}",
    //     "department_id": 8,
    //     "department_name": "业务跟单",
    //     "state": 0
    //   }
    // store.dispatch('add_user', add_data).then(()=>{
    //   console.log(store.state.user.message)
    // })


    // 用户删除==ok
    // store.dispatch('del_user',{user_id:'ndai@example.com'}).then(()=>{
    //   console.log(store.state.user.message)
    // })


    // 用户更新==ok
    // const sete_data = {
    //   "user_id":"xiaohaha",
    //   "setting_data":{
    //     "nickname":"我的昵称"
    //   },
    // }
    // store.dispatch('update_user', sete_data).then(()=>{
    //   console.log(store.state.user.message)
    // })


    // 用户===批量删除ok
    // const batch_del_data = {
    //   "b_id":[319,315,310]
    // }
    // store.dispatch('bacth_del', batch_del_data).then(()=>{
    //     console.log(store.state.user.message)
    // })


    // 计算属性
    const heda = computed(()=>{
      return props
    })

    return{
      heda,
      PAGE
    }
  }
})
</script>

<style scoped>
.logo_text{width: 60px; float: left; color: #ffffff;font-size: 18px;}
.head{textAlign:'center';color:#fff;height: 64px;paddingInline: 50px;lineHeight: '64px';backgroundColor: '#fff';width:100%;}

</style>