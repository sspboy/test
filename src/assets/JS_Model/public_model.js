// admin后台公用请求的一些基础方法方法
import axios from "axios";

// 接口请求地址配置
export class A_Patch{

    // 管理后台
    AdminAPI={
        // 用户管理
        user: {
            "list": "api/admin/user/list",  // [post]列表// [put]data 批量删除
            "detaile": "api/admin/user/",   // [get]+id详情
            "delete": "api/admin/user/",    // [delete]+id删除
            "edit": "api/admin/user/",      // [put]setting_data+id 传数据更新
            "add": "api/admin/user/add"     // [post]
        },
        // 菜单管理
        menu:{
            "list": "api/admin/menu/list",  // [post]列表
            "detaile": "api/admin/menu/",   // [get]+id详情
            "delete": "api/admin/menu/",    // [delete]+id删除
            "edit": "api/admin/menu/",      // [put]setting_data + id 传数据更新
            "add": "api/admin/menu/add"     // [post]
        },
        // 功能列表
        function: {
            "list": "api/admin/function/list",  // [post]列表 [put]data 批量删除
            "detaile": "api/admin/function/",   // [get]+id详情
            "delete": "api/admin/function/",    // [delete]+id删除
            "edit": "api/admin/function/",      // [put]setting_data+id 传数据更新
            "add": "api/admin/function/add"     // [post]
        },
        // 版本管理
        version:{
            "list": "api/admin/version/list",  //[post]列表
                                                // [put]data 批量删除
            "detaile": "api/admin/version/",   // [get]+id详情
            "delete": "api/admin/version/",    // [delete]+id删除
            "edit": "api/admin/version/",      // [put]setting_data + id 传数据更新
            "add": "api/admin/version/add"     // [post]
        }

    }

    // 系统设置
    BasicsAPI={
        // 团队管理
        team:{

        },
        // 组织架构
        department: {
            "list": "api/admin/department/list",  // [post]列表 [put]data 批量删除
            "detaile": "api/admin/department/",   // [get]+id详情
            "delete": "api/admin/department/",    // [delete]+id删除
            "edit": "api/admin/department/",      // [put]setting_data+id 传数据更新
            "add": "api/admin/department/add"     // [post]
        },
        // 角色管理
        role:{

        },
        // 品牌信息
        brandinfo:{
            
        },
    }
    // 应用市场
    AppSrtoreAPI={




    }

}


// 权限验证
export class PublicModel {

    // 登录鉴权 组合
    Verifypermiss(response){
        this.VerifyLogin(response)
        this.VerifyAdmin(response)
        this.VerifyRootaccount(response)
        this.VerifySubaccounts(response)
    }

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
    axios_post(url, data , callback){

        const Fetch_Post_Data = async ()=>{

        try{

            const response = await axios.post(url, data);

            this.Verifypermiss(response.data) // 前端登录鉴权

            callback(response.data)

        }catch (error){

            console.error('post request err!',error)

        }
    }

        return { Fetch_Post_Data }

    }

    // Get请求
    async axios_get(url, callback){

        const Fetch_Get_Data = async ()=> {

            try{

                const response = await axios.get(url);

                callback(response.data)

            }catch (error){

                console.error('post request err!',error)

            }

        }
        return { Fetch_Get_Data }
    }
}



// 加载菜单父子关系
export class MenuLoad {

    parent_children(data){

        var one_menu_list = this.get_one_menu(data) // 一级菜单列表

        for (let i of one_menu_list){
            var id = i.id
            var children_list = this.get_two_menu(id,data)
            if(children_list.length > 0){
                i.children = children_list
            }
        }
        return one_menu_list
    }
    // 获取一级菜单列表
    get_one_menu(data){
        var one_menu_list = []
        for(let i of data){
            // var id = i.id
            var parent_id = i.parent_id
            if(parent_id == 0){
                one_menu_list.push(i)
            }
        }
        return one_menu_list
    }

    get_two_menu(id, data){
        var children_menu_list = []
        for(let i of data){
            i.key = i.id // 添加key
            i.value = i.id.toString() // 添加value
            i.label = i.name // 添加name

            if(i.parent_id == id){
                children_menu_list.push(i)
            }
        }
        return children_menu_list
    }

}




