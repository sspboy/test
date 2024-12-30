<template>
    <div>
      <a-modal v-model:open="props.data.open" width="750px" :title="props.data.title" :confirm-loading="confirmLoading" @ok="handleOk" >

        <div style="border: 1px solid #ccc">
          
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
import { defineComponent, onBeforeUnmount, ref, shallowRef, onMounted, computed,reactive } from 'vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { IToolbarConfig,DomEditor } from '@wangeditor/editor'
import { Editor,editor, Toolbar } from '@wangeditor/editor-for-vue'

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

      const get_img_list = ()=>{

        var img_data = props.data.data

        var img_list = img_data.split('|')

        var img_html = ''

        for(let i of img_list){
          var img_text = "<img src='" + i + "' />"
          img_html = img_html + img_text
        }

        return img_html
      
      }
        
      // 图片数据
      const valueHtml = computed(()=>{

        return get_img_list()

      })

      // 编辑器工具栏配置
      const toolbarConfig = {
      }

      toolbarConfig.excludeKeys = [
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
          "fullScreen",
          "insertLink",
          "editLink",
          "insertVideo",
          "uploadVideo",
          "todo",
          "redo",
          "undo"
        ]


      // 编辑器实例，必须用 shallowRef
      const editorRef = shallowRef()

      const editorConfig = { placeholder: '请输入内容...' }

      // 组件销毁时，也及时销毁编辑器
      onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
      })

      const handleCreated = (editor) => {
        
        editorRef.value = editor // 记录 editor 实例，重要！

        // 查看所有工具栏key
        console.log(editor.getAllMenuKeys());

      }



        
      const confirmLoading = ref(false);

      const handleOk = () => {
          confirmLoading.value = true;
          setTimeout(() => {
            confirmLoading.value = false;
          }, 2000);
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