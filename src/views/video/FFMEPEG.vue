
<template>

    <h1 style="margin-top: 20px;margin-left: 100px;">前端本地视频画面截图</h1>
    <div style="margin:10px 100px 10px 100px;">
    <h3>本地视频 截取第一帧图片 Upload a mp4 (x264) video and trim its first 1 seconds and play!</h3>
      <a-form
        :model="formVideo"
        name="localvedio"
        autocomplete="off"
        @finish="get_url"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="网络视频地址"
          name="video_url"
        >

        <a-image id="output-video" :src="formVideo.video_url" style="width: 100px;height: 100px;"></a-image>

        </a-form-item>
        <a-form-item>
          <a-input type="file" id="uploader" @change="trim" />
          <p id="message"></p>
        </a-form-item>


        <a-form-item>

          <a-button type="primary" size="small" html-type="submit">下载图片</a-button>

        </a-form-item>


      </a-form>


    </div>


    <div style="margin: 100px; padding-bottom: 100px;">
      <h1>网络视频随机截图</h1>

      <video
          controls
          width="20%"
          :src="formState.video_url"
        >
        Your browser does not support the video tag.
      </video>

      <a-list :grid="{ gutter: 16, column: 4 }" :data-source="data.data">
        <template #renderItem="{ item }">
          <a-list-item>

            <template #extra>
          <img
            width="100"
            alt="haha"
            :src="item.img_url"
          />
        </template>
          </a-list-item>
        </template>
      </a-list>



      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="网络视频地址"
          name="video_url"
          :rules="[{ required: true, message: '输入视频地址!' }]"
        >
          <a-input v-model:value="formState.video_url" type="url"></a-input>
        </a-form-item>


        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button size="small" html-type="submit" type="primary">点击开始截图网络视频</a-button>
        </a-form-item>

      </a-form>

    </div>

</template>

<script>
// 通过js引用FFMpeg
import {ref, defineComponent, reactive} from 'vue'


export default defineComponent({

  name:'Video',

  setup(props, ctx) {

    const { fetchFile } = FFmpegUtil;

    const { FFmpeg } = FFmpegWASM;

    let ffmpeg = null;

    const imgurl = ref('http://192.168.3.120:8080/logo.png')


    const formState = reactive({

      video_url:'http://218.108.199.110:81/netdisk-boot/profile/upload/9p8o6g/%E8%88%92%E5%85%8B/%E4%BA%A7%E5%93%81%E5%8D%96%E7%82%B9/gongneng1.mp4'

    })


    // 截图本地文件
    const trim = async ({ target: { files } }) => {

      const message = document.getElementById('message');

      if (ffmpeg === null) {

        ffmpeg = new FFmpeg();

        ffmpeg.on("log", ({ message }) => {
          console.log(message);
        })

        ffmpeg.on("progress", ({ progress }) => {
          message.innerHTML = `${progress * 100} %`;
        });

        await ffmpeg.load({
          coreURL: "/FFMPEG/core/package/dist/umd/ffmpeg-core.js",
        });

      }

      const { name } = files[0];

      await ffmpeg.writeFile(name, await fetchFile(files[0]));

      message.innerHTML = 'Start trimming';

      // await ffmpeg.exec(['-i', name, '-ss', '0', '-to', '1', 'output.mp4']);
      await ffmpeg.exec(['-i', name, '-vframes', '1', 'output.png']);

      // 截图指令
      // -i input.mp4 -vframes 1 output.png

      message.innerHTML = 'Complete trimming';

      // const data = await ffmpeg.readFile('output.mp4');
      const data = await ffmpeg.readFile('output.png');

      // video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));

      // 构造url
      // imgurl.value = URL.createObjectURL(new Blob([data.buffer], { type: 'image/png' }));
      formVideo.video_url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/png' }));


      console.log(imgurl.value)

    }

    const formVideo = reactive({
      video_url:'http://192.168.3.120:8080/logo.png'
    })
    const get_url = (values) => {
      console.log(values)
      // 创建一个链接元素用于下载
      const downloadLink = document.createElement('a');
      downloadLink.href = values.video_url;
      downloadLink.download = 'image.png'; // 指定下载文件名
      // 触发下载
      downloadLink.click();
    }
















    // 列表数据
    const data = reactive({data:[
      {
        title: 'Title 1',
        img_url:'http://192.168.3.120:8080/logo.png'
      },
      {
        title: 'Title 2',
        img_url:'http://192.168.3.120:8080/logo.png'

      },
      {
        title: 'Title 3',
        img_url:'http://192.168.3.120:8080/logo.png'

      },
      {
        title: 'Title 4',
        img_url:'http://192.168.3.120:8080/logo.png'
      },
    ]})

    // 获取网络视频地址截图
    const onFinish = async (values) => {

      const message = document.getElementById('message');

      if (ffmpeg === null) {

        ffmpeg = new FFmpeg();

        ffmpeg.on("log", ({ message }) => {
          console.log(message);
        })

        ffmpeg.on("progress", ({ progress }) => {
          message.innerHTML = `${progress * 100} %`;
        });

        await ffmpeg.load({
          coreURL: "/FFMPEG/core/package/dist/umd/ffmpeg-core.js",
        });

      }

      console.log('Success:', values.video_url);

      var video_url = values.video_url

      await ffmpeg.writeFile('name', await fetchFile(video_url));

      var miaolist = [
        {'time':'00:00:1.000', 'top':'1'},
        {'time':'00:00:2.000', 'top':'1'},
        {'time':'00:00:3.000', 'top':'1'},
        {'time':'00:00:4.000', 'top':'1'}]

      var data_list = []

      for(let i of miaolist){

        var data_obj = {}

        var name = 'mimi_' + i + '.png'

        await ffmpeg.exec(['-i', 'name', '-ss', i.time, '-frames:v', i.top, name]);

        const data = await ffmpeg.readFile(name);

        var img_url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/png' }));

        console.log(img_url)

        data_obj.title = 'tt'
        data_obj.img_url = img_url
        data_list.push(data_obj)

      }

      data.data= data_list

    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };



    return{
      trim,
      imgurl,
      formState,
      onFinish,
      onFinishFailed,
      data,
      get_url,
      formVideo
    }

  }


})

</script>