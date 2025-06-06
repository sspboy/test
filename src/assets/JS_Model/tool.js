import axios from "axios";// 网络请求方法
import { message } from 'ant-design-vue';

    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        // 接口错误
        // 权限错误
        // cookie过期
        
        // console.log('响应拦截器')
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
        }
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