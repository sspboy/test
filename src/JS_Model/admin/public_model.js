// admin后台公用请求的一些基础方法方法

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

    // 获取用户信息
    // 获取菜单信息



};


// 加载菜单
export class MenuLoad {

    hello(){
        console.log('hello!')
    }

}


// 加载头部

