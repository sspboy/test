// admin后台公用请求的一些基础方法方法
import axios from "axios";
import {ref} from "vue"
// 权限验证

export class PublicModel {

    // 登录验证
    VerifyLogin(response){
        if(response === 'NOT Login power'){
            return window.location.href = '/pleaselogin';
        }
    }

    // 管理员account_type = 2权限验证
    VerifyAdmin(response){
        if(response === 'Not admin'){
            return window.location.href = '/403';
        }
    }

    // 主账号account_type = 0权限验证
    VerifyRootaccount(response){
        if(response === 'Not Root'){
            return window.location.href = '/403';
        }
    }
    // 子账号权限验证
    VerifySubaccounts(response){
        if(response === 'Not Sub'){
            return window.location.href = '/403';
        }
    }


    // 封装Post请求
    axios_post(url, data){

        const postdata = ref('')
        const Fetch_Post_Data = async ()=>{

            try{

                const response = await axios.post(url, data);

                this.VerifyLogin(response.data) // 前端鉴权

                postdata.value = response.data

            }catch (error){

                console.error('post request err!',error)

            }
        }

       return { postdata, Fetch_Post_Data }

    }

    // Get请求
    async axios_get(url){

        const getdata = ref('')
        const Fetch_Get_Data = async ()=> {

            try{

                const response = await axios.get(url);

                getdata.value = response.data

            }catch (error){

                console.error('post request err!',error)

            }

        }
        return { getdata, Fetch_Get_Data }
    }
}



// 加载菜单
export class MenuLoad {

    hello(){
        console.log('hello!')
    }

}




