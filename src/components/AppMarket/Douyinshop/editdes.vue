<template>
    <div>
      <a-modal v-model:open="props.data.open" width="750px" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" :destroyOnClose="true">
        <div style="border: 1px solid #ccc;">
          
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />

          <Editor
            style="height: 600px; overflow-y: hidden;"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
          />

        </div>
      </a-modal>
    </div>




</template>
  <script>
import { defineComponent, onBeforeUnmount, ref, shallowRef, computed,reactive } from 'vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { message } from 'ant-design-vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';
export default defineComponent({

    name: "Edit_des",  // 功能添加
    // 引用组件
    components: {
      Editor,
      Toolbar

    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {
      const API = new utils.A_Patch()       // 请求接口地址合集
      const TO = new TABLE.TableOperate()   // 表格操作方法
        
      // 图片数据
      const valueHtml = ref('<p></p>')
      
      // 编辑器实例，必须用 shallowRef
      const editorRef = shallowRef()

      const editorConfig = { placeholder: '请输入内容...' }

      // 编辑器工具栏配置
      const toolbarConfig = {
        excludeKeys: [
          'bold',
          "underline",
          "italic",
          "through",
          "color",
          "clearStyle",
          "bgColor",
          "codeBlock",
          "blockquote",
          "bulletedList",
          "numberedList",
          "insertTable",
          "header1",
          "header2",
          "header3",
          'headerSelect',
          'italic',
          'group-more-style', // 排除菜单组，写菜单组 key 的值即可
          //"fullScreen",
          "insertLink",
          "editLink",
          "insertVideo",
          "uploadVideo",
          "todo",
          "redo",
          "undo",
          "uploadImage"
        ]
      }

      // 组件销毁时，也及时销毁编辑器
      onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) {
          return editor.destroy()
        }
      })

      //  创建编辑器
      const handleCreated = (editor) => {
        
        editorRef.value = editor // 记录 editor 实例，重要！
        
        editor.clear() // 清空编辑器

        var img_list = JSON.parse(props.data.data) // 初始数据

        for(let i of img_list){

          const node = { type: 'image', children: [{ text: '' }]}

          node.src = i.OriginUrl
          node.OriginUrl = i.OriginUrl  
          node.Name= i.Name
          node.MaterialId = i.MaterialId
          node.ByteUrl = i.ByteUrl
          node.AuditStatus = i.AuditStatus
          node.IsNew = i.IsNew
          node.FolderId = i.FolderId
          editor.insertNode(node)

        }

      }



      const confirmLoading = ref(false);

      // 确认按钮
      const handleOk = () => {
        
          var img_list = editorRef.value.getElemsByType('image') // 获取图片地址

          if (img_list) {img_list.forEach(tag => {
            delete tag.id;
            delete tag.type;
            delete tag.children;
            delete tag.src;
          });
          }


          var img_num = img_list.length // 图片数量

          if(img_num === 0){

            message.info('描述图不能为空！');        // 提示图片数量不能为空

          }else if(img_num > 50){

            message.info('商品图不能超过50张！');    // 提示图片数量不能超过50张
          
          }else{

            confirmLoading.value = true;
            
            TO.message.url = API.AppSrtoreAPI.copyrecords.edit // 编辑用户接口调用

            const up_date = {

              id:props.data.id,

              setting_data:{

                "description":img_list
              }

            }

            TO.actions.update(up_date,(res)=>{

              // console.log('更新主图' + res)

              setTimeout(() => {

                confirmLoading.value = false;             

                props.data.open = false;  // 收起model

                ctx.emit('edit_des_callback')   // 回调刷新表格

              },2000)


            })


          }

      };

    
    return {
        props,
        confirmLoading,
        handleOk,

        editorRef,
        valueHtml,
        mode: 'simple', // 或 'simple' 'default'
        toolbarConfig,
        editorConfig,
        handleCreated,
        }
    }


})
  
  </script>