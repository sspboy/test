// 版本信息请求共享
import axios from "axios";
// 引用外部方法
import * as utils from '@/assets/JS_Model/public_model';
const API = new utils.A_Patch()

/* State 数据暂存*/
const state = ()=>({
    message: {
        condition:'None',
        page:1,
        page_size:10,
        data_list:{},
        detaile:{},
        del_state:'',
        update_state:'',
        add_state:'',
        bacth_del:'',
        user_data:{}
    }
})

/* Getter 操作数据方法==计算属性*/
const getters = {

}

/* Mutation 同步操作，对state中数据更新*/
const mutations = {

    // 更新>详情
    detaile:(state, resdata)=>{
        state.message.detaile = resdata;
    },

    // 更新>列表
    data_list:(state,resdata)=>{

        for(let colums of resdata.colum){
            // id
            if(colums.field_name === "id"){
              colums['align'] = 'center'
              colums['width'] = 74
            }
            // 关联菜单id
            if(colums.field_name === "m_id"){
              colums['align'] = 'center'
              colums['width'] = 90
            }
            // 菜单名称
            if(colums.field_name === "m_name"){
              colums['align'] = 'left'
              colums['width'] = 120
            }
            // 功能名称
            if(colums.field_name === "name"){
              colums['align'] = 'center'
              colums['width'] = 140
            }
            // 函数名称
            if(colums.field_name === "def_name"){
              colums['align'] = 'center'
              colums['width'] = 174
            }
            // 描述
            if(colums.field_name === "miaoshu"){
              colums['align'] = 'center'
              colums['width'] = 100
            }
            // 创建时间
            if(colums.field_name === "create_time"){
              colums['align'] = 'center'
              colums['width'] = 200
            }
            // 更新时间
            if(colums.field_name === "update_time"){
              colums['align'] = 'center'
              colums['width'] = 200
            }
        }

        var op = {

              "dataIndex": "state",
              "field_name": "state",
              "field_type": "int",
              "key": "operation",
              "title": "操作",
              "fixed": 'right',
              "align":"center",
              "width":100
        }

        resdata.colum.push(op) // 添加操作按钮
        state.message.page = resdata.now_page;
        state.message.page_size = resdata.page_size;
        state.message.user_data = resdata.user; // 接口返回数据
        delete resdata.user
        state.message.data_list = resdata;
    },

    // 更新>删除
    del_state:(state,resdata)=>{
        state.message.del_state = resdata;
    },

    // 更新>编辑
    update_state:(state,resdata)=>{
        state.message.update_state = resdata;
    },

    // 更新>编辑
    add_state:(state,resdata)=>{
        state.message.add_state = resdata;
    },

    // 批量>删除
    batch_del:(state,resdata)=>{
        state.menu_message.bacth_del = resdata;
    }
}

/* Action */
const actions = {

    // 查询列表
    list:async ({ commit },data)=>{

        try{

            await axios.post(API.AdminAPI.version.list, data).then((response)=> {

                commit('data_list', response.data)

            })

        }catch (error){

            console.error('version list post request err!',error)

        }
    },
    // 查询菜单详情
    get:({ commit }, data)=>{
        try{

            let url = API.AdminAPI.version.detaile + data.id

            axios.get(url).then((response)=>{

                commit('detaile', response.data)

            })

        }catch (error){

            console.error('get version detaile request err!',error)

        }
    },
    // 添加菜单
    add:({ commit },data)=>{

        try{

            axios.post(API.AdminAPI.version.add, data).then((response)=>{

                commit('add_state', response.data)

            })

        }catch (error){

            console.error('add version detaile request err!',error)

        }
    },
    // 更新
    update:({ commit }, data)=>{

        try{

            let url = API.AdminAPI.version.edit + data.id

            axios.put(url, data).then((response)=>{

                commit('update_state', response.data)

            })

        }catch (error){

            console.error('put version detaile request err!',error)

        }
    },
    // 删除菜单
    del:({ commit },data)=>{

        let url = API.AdminAPI.version.delete + data.id

        try{

            axios.delete(url).then((response)=>{

                commit('del_state', response.data)

            })
        }catch (error){

            console.error('delete version detaile request err!',error)

        }
    },
    // 批量删除菜单
    batch_del:({ commit },data)=>{

        try{

            axios.put(API.AdminAPI.version.list, data).then((response)=>{

                commit('bacth_del', response.data)

            })

        }catch (error){

            console.error('bacth del version request err!',error)

        }
    }

}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,// 空间命名，独立隔离
    // namespaced: true  命名空间这一行一定要写，这是vuex寻找子组件的依据；
}