
<template>

    <div>

      <a-modal
        v-model:open="props.data.open" 
        :title="props.data.title" 
        :confirm-loading="confirmLoading" 
        width="100%" 
        wrap-class-name="full-modal" 
        @ok="handleOk" 
        okText="上传并保存"
      >
        
        <a-row>
          <a-form
              layout="inline"
              :model="item_data"
              @finish="handleFinish"
              @finishFailed="handleFinishFailed"
          >
            <a-space size="middle" style="padding: 10px 0 10px 0;">

                <a-input size="small" v-model:value="item_data.material_object_id" :disabled="true" placeholder="素材文件夹"></a-input>
                
                <a-button size="small" style="font-size: 12px;" >选择素材文件夹</a-button>

                <a-button type="primary" size="small" style="font-size: 12px;">设置为默认文件夹</a-button>

                <a-button type="primary" size="small" style="font-size: 12px;" html-type="submit">上传所有图片</a-button>

            </a-space>

          </a-form>

        </a-row>

        <a-row>
          <!-- 主图 开始-->
          <a-col :span="8">
            <a-table 
            :columns="pic_data.columns" 
            :data-source="pic_data.data" 
            size="small" 
            :pagination="false" 
            :scroll="{ y: 'calc(100)' }" 
            style="font-size: 12px;margin:0 4px 0 0;" 
            bordered>
                <template #bodyCell="{ column,record }">
                  <!--图片-->
                  <template v-if="column.dataIndex === 'origin_url'">
                    <a href="#">
                      <a-image :src="record.origin_url" :width="24" :height="24" />
                    </a>
                  </template>
                  <!--图片-->

                  <!--操作-->
                  <template v-if="column.dataIndex === 'op'">
                    <a href="#">删除</a>
                  </template>
                  <!--操作-->

                </template>
                
                <template #title>
                  商品主图-最多五张
                </template>
                
                <template #footer></template>
            </a-table>
          </a-col>
          <!-- 主图 结束-->

          <!-- 规格图 -->
          <a-col :span="8">

            <a-table 
            :columns="spec_data.columns" 
            :data-source="spec_data.data" 
            size="small" 
            :pagination="false" 
            :scroll="{ y: 'calc(100)' }" 
            style="font-size: 12px;margin:0 2px;" 
            bordered>
                <template #bodyCell="{ column, record }">
                  <!--图片-->
                  <template v-if="column.dataIndex === 'origin_url'">
                    <a href="#">
                      <a-image :src="record.origin_url" :width="24" :height="24" />
                    </a>
                  </template>
                  <!--图片-->
                                    <!--操作-->
                                    <template v-if="column.dataIndex === 'op'">
                    <a href="#">删除</a>
                  </template>
                  <!--操作-->
                </template>
                <template #title>规格图</template>
                <template #footer></template>
            
              </a-table>
          </a-col>
          <!--规格图-->


          <!-- 描述图 -->
          <a-col :span="8">            
            <a-table
            :columns="des_data.columns" 
            :data-source="des_data.data"
            size="small" 
            :pagination="false" 
            :scroll="{ y: 'calc(100)' }" 
            style="font-size: 12px;margin:0 0 0 4px;" 
            bordered>
                <template #bodyCell="{ column, record }">
                  <!--图片-->
                  <template v-if="column.dataIndex === 'origin_url'">
                    <a href="#">
                      <a-image :src="record.origin_url" :width="24" :height="24"/>
                    </a>
                  </template>
                  <!--图片-->

                  <!--操作-->
                  <template v-if="column.dataIndex === 'op'">
                    <a href="#">删除</a>
                  </template>
                  <!--操作-->
                </template>
                <template #title>描述图</template>
                <template #footer></template>
              </a-table>
          </a-col>
          <!-- 描述图 -->

        </a-row>

      </a-modal>
    </div>
</template>


<script>
import { defineComponent,ref,computed,reactive } from 'vue';
import * as utils from '@/assets/JS_Model/public_model';
import axios from "axios";

export default defineComponent({

    name: "Edit_upload_image",  // 功能添加
    // 引用组件
    components: {

    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {
      
      const API = new utils.A_Patch()           // 请求接口

      // 素材id初始化
      const item_data = computed(()=>{

        const material_object_id = ref("0")     // 素材文件id

        const shop_id = props.data.user_data.s_id// 店铺id

        var url = API.AppSrtoreAPI.Shopinfo.detaile + shop_id

        axios.get(url).then((res)=>{
          // console.log(res.data.material_object_id)
          material_object_id.value = res.data.material_object_id
        })

        return reactive({
          user_data:props.data.user_data, // 用户信息
          data_info:props.data.data,      // 数据信息
          material_object_id:material_object_id // 素材文件夹id
        });
      
      })

      // 详情数据初始化
      const pic_data = computed(()=>{
        
        const item_pic = props.data.data.pic;            // 主图

        // 渲染主图
        const get_pic_list = () =>{

          var itempiclist = item_pic.split('|')
          var v_list = []
          for(var i=0;i<itempiclist.length;i++){
            var pic_obj = {
              key:i,
              origin_url:itempiclist[i],
              material_url:'',
              state:'0',
              op:'0',
            }
            v_list.push(pic_obj)
          }
          return v_list
        }

        return reactive({
          columns:[
            {title: '图片地址',dataIndex: 'origin_url','align':'center','width':'80px'},
            {title: '素材地址',className: 'up_state',dataIndex: 'material_url'},
            {title: '审核状态',dataIndex: 'state','align':'center','width':'80px'},
            {title: '操作',className: 'sucai_add',dataIndex: 'op','align':'center','width':'80px'}
          ],
          data:get_pic_list() // 获取图片数组

        })
      })

      // 规格图初始化
      const spec_data = computed(()=>{

        const spec_images= JSON.parse(props.data.data.sku);                           // 规格图

        console.log(spec_images)

        // 渲染规格图片
        const get_spec_img = () =>{
          var spec_img_list = []
          for(let i of spec_images){
            var value_list = i.value
            for(let v of value_list){
              if(v.img !== undefined){spec_img_list.push(v.img)}
            }
          }
          
          // 不为空
          if(spec_img_list.length > 0){
            var v_list = []
            for(var i=0;i<spec_img_list.length;i++){
            var pic_obj = {
              key:i,
              origin_url:spec_img_list[i],
              material_url:'',
              state:'0',
              op:'0',

            }
            v_list.push(pic_obj)
          }
            return v_list
          }else{// 为空
            return false
          }
            
        }
        return reactive({
          columns:[
            {title: '图片地址',dataIndex: 'origin_url','align':'center','width':'80px'},
            {title: '素材地址',className: 'up_state',dataIndex: 'material_url'},
            {title: '审核状态',dataIndex: 'state','align':'center','width':'80px'},
            {title: '操作',className: 'sucai_add',dataIndex: 'op','align':'center','width':'80px'}
          ],
          data:get_spec_img() // 获取图片数组

        })
      })

      // 描述图初始化
      const des_data = computed(()=>{

        const description = props.data.data.description // 描述图

        // 渲染描述图
        const get_des_img_list = () =>{

          var itempiclist = description.split('|')

          var v_list = []

          for(var i=0;i<itempiclist.length;i++){
            var pic_obj = {
              key:i,
              origin_url:itempiclist[i],
              material_url:'0',
              state:'1',
              op:'1'
            }
            v_list.push(pic_obj)
          }
          return v_list
        }

        return reactive({
          columns:[
            {title: '图片地址',dataIndex: 'origin_url','align':'center','width':'80px'},
            {title: '素材地址',className: 'up_state',dataIndex: 'material_url'},
            {title: '审核状态',dataIndex: 'state','align':'center','width':'80px'},
            {title: '操作',className: 'sucai_add',dataIndex: 'op','align':'center','width':'80px'}
          ],
          data:get_des_img_list() // 获取图片数组

        })

      })

      // 刷新图片上传列表
      const refresh_img_list = ()=>{
          
        // 请求新的详情地址
        var detaile_id = props.data.data.id;
        
        // 更新列表数据
        console.log(detaile_id)

        // 上传图片+存储数据：接口
        // 返回结果
        // 刷新列表
        // 关闭弹窗
      
      }


      const confirmLoading = ref(false);

      // 表单提交成功点击方法
      const handleFinish = values => {
        
        refresh_img_list() // 刷新列表

        item_data.value.material_object_id = '1'

        console.log(values);

        console.log(item_data.value)

        console.log(item_data.value.user_data)
        
        console.log(item_data.value.data_info)

        console.log('上传图片')

      };


      // 表单提交失败方法
      const handleFinishFailed = errors => {
        console.log(errors);
      };

      // 确认提交方法
      const handleOk = () => {
        
        console.log(props.data.data.pic.split('|'))
        console.log(props.data.data.sku)
        console.log(props.data.data.description.split('|'))

        confirmLoading.value = true;

        setTimeout(() => {
          confirmLoading.value = false;
          props.data.open = false;  // 收起model

        }, 2000);
      
      };
    
    
    
    return {
        props,
        item_data,
        confirmLoading,
        handleOk,
        handleFinish,
        handleFinishFailed,
        pic_data,
        spec_data,
        des_data,


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
