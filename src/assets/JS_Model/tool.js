import axios from "axios";// 网络请求方法
import { message } from 'ant-design-vue';

    // 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 接口错误
    // 权限错误
    // cookie过期
    
    // console.log('响应拦截器')
    // console.log(response)
    if(response.data == "NOT_Login_Power"){
        message.error('未登录或登录过期')
        window.location.href = '/'
    }

    if(response.data.sub_code == "isv.invalid_ip"){
        message.error('IP被限制')
    }

    if(response.data.sub_code == "isv.access-token-expired"){
        message.error('Token请过期重新授权')
    }

    // console.log(response.data)

    return response;

}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


  export class TOOL{

    Fun_ = {
    
        // 笛卡尔积算法
        cartesianProduct:(sets)=> {
            return sets.reduce((acc, currentSet) =>
                acc.flatMap(accItem => currentSet.map(currentItem => [...accItem, currentItem])),
                [[]]
            );
        },
        // 提示信息
        message:(type,msg)=>{
            message.config({
                duration: 2,
                maxCount: 3,
            })
            message[type](msg)
        },
        // 加载js文件
        loadScript:(src, opts = {})=>{
            return new Promise((resolve, reject) => {
                const script = document.createElement('script')
                script.src = src
                script.async = true
                if (opts.crossOrigin) script.crossOrigin = opts.crossOrigin
                script.onload  = () => resolve(script)
                script.onerror = () => reject(new Error(`Failed to load ${src}`))
                document.head.appendChild(script)
            })
        },

    }


    Http_= {

        get:(url,data)=>{
            return new Promise((resolve,reject)=>{
                axios.get(url,data).then((res)=>{
                    resolve(res)
                }).catch((err)=>{
                    reject(err)
                })
            }) 
        },

        post:(url,data)=>{
            return new Promise((resolve,reject)=>{
                axios.post(url,data).then((res)=>{
                    resolve(res)
                }).catch((err)=>{
                    reject(err)
                })
            })
        },
        
        delete:(url,data)=>{
            return new Promise((resolve,reject)=>{
                axios.delete(url,data).then((res)=>{
                    resolve(res)
                }).catch((err)=>{
                    reject(err)
                })
            })
        },
        
        update:(url,data)=>{
            return new Promise((resolve,reject)=>{
                axios.put(url,data).then((res)=>{
                    resolve(res)
                }).catch((err)=>{
                    reject(err)
                })
            })
        }
    }

}