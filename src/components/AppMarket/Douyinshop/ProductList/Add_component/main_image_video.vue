<!--
创建 主图视频 弹出窗口 组件--
接受主图地址列表
提交接口创建主图视频
存储到素材库
返回素材地址
-->
<template>

<a-modal
      v-model:open="props.data.open"
      title="创建主图视频"
      centered
    >
      <div style="padding: 20px 0 50px 0;text-align: center;width: 100%;">


        <div 
          class="font_size_12 videobox"
          v-if="CreateVideo.VideoCoverUrl !== undefined"
          ><a-flex 
            justify="center" 
            align="center" 
            style="height: 100%;" 
            class="font_size_12">
            <a @click="CreateVideo.Playvideo">
            <img 
              style="width: 100px; height: 100px;"
              :src="CreateVideo.VideoCoverUrl">
            </a>
          </a-flex>
          <p style="margin: 10px 0 0 0;">{{ CreateVideo.load_text }}</p>

        </div>




        <div 
          class="font_size_12 videobox"
          v-if="CreateVideo.process_load === false && CreateVideo.VideoCoverUrl === undefined"
          ><a-flex 
            justify="center" 
            align="center" 
            style="height: 100%;" 
            class="font_size_12">
            视频
          </a-flex>
          <p style="margin: 10px 0 0 0;">{{ CreateVideo.load_text }}</p>

        </div>

        

        


        <div v-else-if="CreateVideo.process_load === true && CreateVideo.VideoCoverUrl === undefined" class="font_size_12 videobox">
          <a-flex 
            justify="center" 
            align="center" 
            style="height: 100%;" 
            class="font_size_12">
            <a-spin size="small" />
          </a-flex>
          <p style="margin: 10px 0 0 0;">{{ CreateVideo.load_text }}</p>
        </div>
      
    </div>






    <template #footer>
        <a-flex justify="center" gap="8">
            <a-button type="primary" v-if="CreateVideo.VideoCoverUrl === undefined" :loading="CreateVideo.process_button_load" @click="CreateVideo.get">开启处理</a-button>
            <a-button v-else type="primary" @click="CreateVideo.set_in_add_page">添加视频</a-button>
            <a-button @click="props.data.open = false">取消</a-button>
            
        </a-flex>
    </template>
    </a-modal>

</template>

<script>
import axios from 'axios';
import { defineComponent, ref,reactive, computed, watch, onMounted } from 'vue'
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

export default defineComponent({

  name: '主图视频',
  
  components: {
    
  },
  
  props: {
    data: {
      type: Object,
    }
  },
  
  emits: ['create_pic_video_callback'], // 注册回调方法
  
  setup(props, { emit, attrs, slots, expose }) {


    const tool = new TOOL.TOOL()            // 工具方法
    const API = new utils.A_Patch()         // 请求接口地址合集

    // console.log('开启视频创建页面')

    const CreateVideo = reactive({
      
      process_button_load:false,// 视频处理按钮状态

      process_load:false, // 视频处理状态

      load_text: '暂无', // 加载提示文字：处理中、创建成功：到【视频上传记录】 查看审核状态
      
      // VideoCoverUrl:'https://p3-sign.douyinpic.com/tos-cn-v-2e5523/oYwUldJJvmtI8IQY1Y9GdWOv0ARmHdEaBYkzw~tplv-noop.image?dy_q=1785077097&l=202607262244571853BC82BA3189036C2A&x-expires=1785080702&x-signature=yQJYvnmKSLLlJF%2FaFgnHyONulIA%3D',// 视频封面地址
      VideoCoverUrl:undefined,// 视频封面地址

      MainUrl:undefined,

      videoObj:undefined,

      // 抖店素材审核时间过长，提示用户 文件名称、存储地址、视频上传记录查看审核状态；

      // 请求oss视频，返回responesID, 上传素材，查询素材详情，获取素材url
      get:async()=>{
        CreateVideo.process_button_load =true;//开启按钮loading
        CreateVideo.process_load = true;// 开启图片容器loading
        CreateVideo.load_text = '处理中...'


        // 上传文件夹id
        var folder_id =props.data.folder_id;

        // 图片列表格式转义
        props.data.checkedList.forEach(value=>{
          value.url = value.byte_url
          value.type = 'image'
          delete value.byte_url;
        })
        // 视频总时长计算=(一张图3秒时长)
        var Total_duration = props.data.checkedList.length * 3;
        if(Total_duration<5){
          Total_duration=5
        }

        // console.log(props.data,Total_duration)


         // 创建视频任务
        var oss_video_create_task_response = await axios.post(API.AppSrtoreAPI.oss.CreatePicVideo,{
          
          "scene":props.data.scene, 
          // 生成视频场景类型:costume：服饰场景（默认）general：通用场景 keeporder：强制按输入素材顺序合成视频场景
          
          "width" : "640",  // 视频宽度
          "height": "640",  // 视频高度
          
          "style":props.data.style,  // 输出视频节奏

          "duration": Total_duration,  // 视频总时长

          "durationAdaption":true,  // 输出视频时长自适应。取值true或false，为true时Duration设置不生效
          
          "transitionStyle":props.data.transitionStyle, // 专场风格

          "image_list":props.data.checkedList// 创建视频的图片地址列表

        }).catch(err=>{
            
          console.error('创建视频失败:', err.message);

          throw err;  // 重新抛出，中断外层方法

        })

        
        var status = oss_video_create_task_response.status// 200为创建成功

        var response_id = oss_video_create_task_response.data.RequestId// 任务id
        
        console.log('任务id', response_id)

        // 等待
        // await new Promise(r => setTimeout(r, (props.data.checkedList.length + 5) * 1000));

        // 查询任务进度 轮询的使用方法的使用 例子

        try {

            var task_obj = await tool.Fun_.polling('task-123', {
                interval: 4000,// 间隔 ms
                maxAttempts: 5,// 最大轮询次数
                timeout:60000,      // 总超时 ms
                APIurl:API.AppSrtoreAPI.oss.SelectTaskProgress,
                postdata:{
            
                  "job_id":response_id
              
                },
                onProgress: (data, count) => {

                  console.log(`第 ${count} 次查询: ${data.status}`);
                }

            });

            // console.log('结果:', task_obj);
        
        } catch (err) {
          
          console.error('轮询失败:', err.message);

        }

        // console.log('任务进度', task_obj)

        var VideoUrl = JSON.parse(task_obj.data.Data.Result).VideoUrl; // oss视频地址

        console.log('oss视频地址', VideoUrl)






        // 视频任务完成==》上传视频到素材库
        var m_obj = await axios.post(API.AppSrtoreAPI.material.batchuploadvideo,{

          "folder_id":folder_id,

          "video_list":[
              {
                "name":Date.now() + "_主图视频",
                "url":VideoUrl
              }
          ]
        }).catch(err=>{
            
            console.error('视频上传失败:', err.message);

            throw err;  // 重新抛出，中断外层方法
        
        })

        console.log('抖店素材库返回视频上传对象',m_obj)

        // 审核不通过=》驳回原因=？重新选择素材图片创建

        // 审核通过
        var success_map = m_obj.data.data.success_map;
        var res_video_Materia = {}

        Object.values(success_map).forEach(value => {
          // console.log(value);
          res_video_Materia.FolderId = value.FolderId; // 文件夹id
          res_video_Materia.MaterialId = value.MaterialId;// 获取素材id
          res_video_Materia.name = value.Name;
          res_video_Materia.AuditStatus = value.AuditStatus // 视频审核状态: 0-下载中 1-待审核 2-审核中 3-审核通过 4-审核拒绝
        });

        CreateVideo.load_text = '创建视频已传入指定文件夹,正在审核ing...'
        






        // 等待
        await new Promise(r => setTimeout(r, 3000));
      
        // 查询视频素材详情==返回素材视频信息
        var m_video_deitaile = await axios.post(API.AppSrtoreAPI.material.detaile,{

          "material_id":res_video_Materia.MaterialId// 视频id列表

        }).catch(err=>{
            
            console.error('查询视频url失败:', err.message);

            throw err;  // 重新抛出，中断外层方法
        
        })

        console.log('素材库视频详情', m_video_deitaile)

        var video_info = m_video_deitaile.data.data.material_info.video_info; // 视频详情
        var material_info = m_video_deitaile.data.data.material_info
        var vid = video_info.vid// vid 用于获取视频播放地址
        var video_cover_url = video_info.video_cover_url;// 封面地址
        console.log(vid)



        // 等待
        await new Promise(r => setTimeout(r, 5000));

        // 根据vid获取视频播放地址
        var video_play_obj = await axios.post(API.AppSrtoreAPI.material.batchgetvideodetaile,{
          
          "vid_list":[vid]// 视频id列表

        }).catch(err=>{
            
            console.error('视频播放地址获取失败:', err.message);

            throw err;  // 重新抛出，中断外层方法
        
        })

        // console.log('视频播放对象',video_play_obj)

        var video_success_map = video_play_obj.data.data.success_map;
        var video_success_obj = {}
        Object.values(video_success_map).forEach(value => {
          video_success_obj = value
        });

        // 视频播放对象
        console.log('视频播放对象',video_success_obj);
        CreateVideo.VideoCoverUrl = video_success_obj.VideoCoverUrl; // 封面地址
        CreateVideo.MainUrl = video_success_obj.MainUrl// 播放地址

        CreateVideo.process_button_load = false; // 关闭按钮loading
        
        CreateVideo.load_text = '创建视频成功'



        // CreateVideo.videoObj = video_success_obj // 视频播放信息

        CreateVideo.videoObj = [material_info]// 视频素材信息

      },

      // 点击封面图片=》新开窗窗口播放视频
      Playvideo:()=>{
        window.open(CreateVideo.MainUrl, '_blank','noopener,noreferrer');
      },

      // 发送到ADD页面
      set_in_add_page:()=>{

        // 图片地址返回-地址写入页面
        console.log('写入添加商品页面')

        props.data.open=false// 关闭弹出框

        emit('create_pic_video_callback', CreateVideo.videoObj)

      }


    })
    
    
    // 生命周期
    // onMounted(() => {
    //   console.log('模板名称 组件已挂载')
    // })
    
    return {
      props,
      CreateVideo

    }
  }
})
</script>

<style scoped>
.delivery-method {
  padding: 16px;
  border: 1px solid #eee;
}
.img_pic{height: 100px;width: 100px;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;}
.Add_img{height: 100px;width: 100px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.videobox{width: 140px;height: 140px;border: 1px #f2f2f2 solid;text-align: center;margin: 0 auto;}


</style>