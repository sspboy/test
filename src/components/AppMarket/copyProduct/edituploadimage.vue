
<template>

    <div>

      <a-modal
        v-model:open="props.data.open" 
        :title="props.data.title" 
        :confirm-loading="confirmLoading" 
        width="100%" 
        wrap-class-name="full-modal"
        :destroyOnClose="true"
        :footer="null"
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

                <a-button type="primary" size="small" style="font-size: 12px;" :loading="loading" :disabled="disabled" html-type="submit">上传所有图片</a-button>

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
                <template #bodyCell="{ column,record,text }">
                  <!--图片-->
                  <template v-if="column.dataIndex === 'OriginUrl'">
                    <a href="#">
                      <a-image :src="record.OriginUrl" :width="24" :height="24" />
                    </a>
                  </template>
                  <!--图片-->
                  <!--素材-->
                  <template v-if="column.dataIndex === 'ByteUrl'">
                    <a v-if="text === ''" href="#">
                      <a-skeleton :active="true" :paragraph="false" />
                    </a>
                    <a v-else-if="text === 'None'" href="#">
                      <a-skeleton :active="true" :paragraph="false" />
                    </a>
                    <a v-else href="#">
                      <a-image :src="record.ByteUrl" :width="24" :height="24"/>
                    </a>
                  </template>
                  <!--素材-->
                  <!--状态-->
                  <template v-if="column.dataIndex === 'AuditStatus'">
                    <span v-if="text == '1'">等待审核</span>
                    <span v-else-if="text == '2'">审核中</span>
                    <span v-else-if="text == '3'">通过</span>
                    <span v-else-if="text == '4'">驳回</span>
                    <span v-else-if="text == 'None'">未上传</span>
                  </template>
                  <!--状态-->
                  <!--操作-->
                  <template v-if="column.dataIndex === 'op'">
                    <a href="#" v-on:click="pic_del_img(record.OriginUrl)">删除</a>
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
                <template #bodyCell="{ column, record, text }">
                  <!--图片-->
                  <template v-if="column.dataIndex === 'OriginUrl'">
                    <a href="#">
                      <a-image :src="record.OriginUrl" :width="24" :height="24" />
                    </a>
                  </template>
                  <!--图片-->
                  <!--素材-->
                  <template v-if="column.dataIndex === 'ByteUrl'">
                    <a v-if="text === ''" href="#">
                      <a-skeleton :active="true" :paragraph="false" />
                    </a>
                    <a v-else-if="text === 'None'" href="#">
                      <a-skeleton :active="true" :paragraph="false" />
                    </a>
                    <a v-else href="#">
                      <a-image :src="record.ByteUrl" :width="24" :height="24"/>
                    </a>
                  </template>
                  <!--素材-->
                  <!--状态-->
                  <template v-if="column.dataIndex === 'AuditStatus'">
                    <span v-if="text == '1'">等待审核</span>
                    <span v-else-if="text == '2'">审核中</span>
                    <span v-else-if="text == '3'">通过</span>
                    <span v-else-if="text == '4'">驳回</span>
                    <span v-else-if="text == 'None'">未上传</span>
                  </template>
                  <!--状态-->

                  <!--操作-->
                  <template v-if="column.dataIndex === 'op'">
                    <a href="#" v-on:click="spec_del_img(record.OriginUrl)">删除</a>
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
                <template #bodyCell="{ column, record, text}">
                  <!--图片-->
                  <template v-if="column.dataIndex === 'OriginUrl'">
                    <a href="#">
                      <a-image :src="record.OriginUrl" :width="24" :height="24"/>
                    </a>
                  </template>
                  <!--图片-->
                  <!--素材-->
                  <template v-if="column.dataIndex === 'ByteUrl'">
                    <a v-if="text === ''" href="#">
                      <a-skeleton :active="true" :paragraph="false" />
                    </a>
                    <a v-else-if="text === 'None'" href="#">
                      <a-skeleton :active="true" :paragraph="false" />
                    </a>
                    <a v-else href="#">
                      <a-image :src="record.ByteUrl" :width="24" :height="24"/>
                    </a>
                  </template>
                  <!--素材-->
                  <!--状态-->
                  <template v-if="column.dataIndex === 'AuditStatus'">
                    <span v-if="text == '1'">等待审核</span>
                    <span v-else-if="text == '2'">审核中</span>
                    <span v-else-if="text == '3'">通过</span>
                    <span v-else-if="text == '4'">驳回</span>
                    <span v-else-if="text == 'None'">未上传</span>
                  </template>
                  <!--状态-->
                  <!--操作-->
                  <template v-if="column.dataIndex === 'op'">
                    <a href="#" v-on:click="des_del_img(record.OriginUrl)">删除</a>
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
import axios from "axios";
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';

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
      const confirmLoading = ref(false)         // 提交按钮状态

      // 判断当前受否全部上传
      // 全部删除则禁用按钮
      // 否则启用按钮
      const loading = ref(false)// 上传按钮状态
      const disabled = ref(false)// 按钮状态
      const TO = new TABLE.TableOperate()   // 表格操作方法


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

      // 主图数据初始化
      const pic_data = computed(()=>{
        
        const pic_list = JSON.parse(props.data.data.pic)

        // 遍历数组
        // 有一个审核状态不为None则禁用上传按钮
        for(let i of pic_list){

          if(i.AuditStatus !== 'None'){
            disabled.value = true// 禁用上传按钮
          }else{
            disabled.value = false// 启用上传按钮}
          }
          // 1-等待审核; 2-审核中; 3-通过; 4-拒绝;
          // 1\2重新请求接口获取ByteUrl;3-4状态 不做处理
          if(i.AuditStatus == '1' || i.AuditStatus == '2'){

            var data = {material_id:i.MaterialId}

            axios.post(API.AppSrtoreAPI.material.detaile, data).then((res)=>{
              console.log(res.data)
              i.AuditStatus = res.data.AuditStatus
              i.ByteUrl = res.data.ByteUrl
            })
            
          }

        }

        // 更新数据到数据库
        // axios.post(API.AppSrtoreAPI.material.update, data).then((res)=>{
        //     console.log(res.data)
        // })


        return reactive({
          columns:[
            {title: '图片地址',dataIndex: 'OriginUrl','align':'center','width':'80px'},
            {title: '素材地址',className: 'up_state',dataIndex: 'ByteUrl'},
            {title: '审核状态',dataIndex: 'AuditStatus','align':'center','width':'80px'},
            {title: '操作',className: 'sucai_add',dataIndex: 'op','align':'center','width':'80px'}
          ],
          data:pic_list // 获取图片数组

        })
      })

      // 规格图初始化
      const spec_data = computed(()=>{

        const spec_images= JSON.parse(props.data.data.sku);                           // 规格图

        // 渲染规格图片
        const get_spec_img = () =>{
          
          var spec_img_list = []

          for(let i of spec_images){
            var value_list = i.value
            for(let v of value_list){
              if(v.OriginUrl !== undefined){spec_img_list.push(v)}
            }
          }
          
          // 不为空
          if(spec_img_list.length > 0){
            return spec_img_list
          }else{// 为空
            return false
          }
            
        }
        return reactive({
          columns:[
            {title: '图片地址',dataIndex: 'OriginUrl','align':'center','width':'80px'},
            {title: '素材地址',className: 'up_state',dataIndex: 'ByteUrl'},
            {title: '审核状态',dataIndex: 'AuditStatus','align':'center','width':'80px'},
            {title: '操作',className: 'sucai_add',dataIndex: 'op','align':'center','width':'80px'}
          ],
          data:get_spec_img() // 获取图片数组

        })
      })

      // 描述图初始化
      const des_data = computed(()=>{

        return reactive({
          columns:[
          {title: '图片地址',dataIndex: 'OriginUrl','align':'center','width':'80px'},
            {title: '素材地址',className: 'up_state',dataIndex: 'ByteUrl'},
            {title: '审核状态',dataIndex: 'AuditStatus','align':'center','width':'80px'},
            {title: '操作',className: 'sucai_add',dataIndex: 'op','align':'center','width':'80px'}
          ],
          data:JSON.parse(props.data.data.description) // 描述图

        })

      })

      // 删除主图片方法
      const pic_del_img = (obj_url)=>{
        // 找到要删除的对象的索引
        const index = pic_data.value.data.findIndex(item => item.OriginUrl === obj_url);
        if (index !== -1) {pic_data.value.data.splice(index, 1);}
      }
      // 删除规格图片方法
      const spec_del_img = (obj_url)=>{
        // 找到要删除的对象的索引
        const index = spec_data.value.data.findIndex(item => item.OriginUrl === obj_url);
        if (index !== -1) {spec_data.value.data.splice(index, 1);}
      }
      // 删除详情图片方法
      const des_del_img = (obj_url)=>{
        // 找到要删除的对象的索引
        const index = des_data.value.data.findIndex(item => item.OriginUrl === obj_url);
        if (index !== -1) {des_data.value.data.splice(index, 1);}
      }

      // 上传所有图片
      const handleFinish = values => {
        
        // refresh_img_list() // 刷新列表

        const material_object_id =  item_data.value.material_object_id; // 素材文件夹id

        // 上传图片
        var data = {
          product_id:props.data.data.id,// 商品数据id
          parent_folder_id:material_object_id,// 素材文件夹id

          pic_list:pic_data.value.data,
          spec_list:JSON.parse(props.data.data.sku),
          des_list:des_data.value.data
        }
        var url = API.AppSrtoreAPI.upload.product_img
        console.log(url)
        axios.post(url, data).then((res)=>{
          console.log(res)
        })


      };


      // 表单提交失败方法
      const handleFinishFailed = errors => {

        console.log(errors);
      
      };



      // 确认提交方法
      const handleOk = () => {
        
        confirmLoading.value = true;

        setTimeout(() => {
          confirmLoading.value = false;
          props.data.open = false;  // 收起model

        }, 2000);
      
      };
    

      // 刷新图片上传列表
      const refresh_img_list = (data)=>{
        
        // 同步pic列表数据
        var detaile_id = props.data.data.id;
        
        // 同步规格列表数据
        console.log(detaile_id)

        // 同步描述列表数据

      
      }
    
    return {
        props,
        item_data,
        confirmLoading,
        disabled,
        loading,
        handleOk,
        handleFinish,
        handleFinishFailed,
        pic_data,
        spec_data,
        des_data,
        des_del_img,
        spec_del_img,
        pic_del_img
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
