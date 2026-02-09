/** 导航菜单类 **/
import {h} from "vue";
import {
    PictureOutlined, // 图片图标
    MedicineBoxOutlined, // 药箱图标
    FieldTimeOutlined,// 时间图标
    ReconciliationOutlined,// 对账图标
    CodeOutlined, 
    SettingOutlined,// 设置图标
    UserOutlined,// 用户图标
    MenuOutlined,
    BarsOutlined,
    AccountBookOutlined,
    ShopOutlined,
    HomeOutlined,
    RobotOutlined,
    CopyOutlined,
    FormOutlined
} from "@ant-design/icons-vue";

export class Menu {

    LoadMenu={

        // 一级菜单
        fristlive:(data)=>{

            var menu_list = []
            
            for (var i=0;i<data.length;i++){

                var m_obj = data[i]
                // console.log(menu_list)

                var child = m_obj.child;

                var menu_detaile_obj = this.LoadMenu.first_childlive(m_obj)


                // 判断是否一级菜单
                if(child.length > 0){

                    var child_list = []

                    for(let y of child){

                        var child_obj =  this.LoadMenu.childlive(y)

                        child_obj.key = y.id + ''
                        
                        child_list.push(child_obj)

                    }

                    menu_detaile_obj.key = data[i].field
                    
                    menu_detaile_obj.children = child_list

                }else { // 一级目录

                    menu_detaile_obj.key = m_obj.id + '' // key
                    menu_detaile_obj.field = m_obj.field // field

                }

                menu_list.push(menu_detaile_obj)

          }
        //   console.log(menu_list)
          return menu_list
        },

        childlive:(data)=>{
            var menu_detaile_obj = {}
            menu_detaile_obj.id= data.field
            menu_detaile_obj.label=data.name
            menu_detaile_obj.title=data.name
            return menu_detaile_obj
        },

        first_childlive:(data)=>{
            var menu_detaile_obj = {}
            if(data.ico_name != '0'){
                let ico_name = data.ico_name
                menu_detaile_obj.icon=this.LoadMenu.ico_from()[ico_name]
            }
            menu_detaile_obj.label=data.name
            menu_detaile_obj.title=data.name
            return menu_detaile_obj
        },

        // 图标配置
        ico_from:()=>{
            return {
                'SettingOutlined':() => h(SettingOutlined),
                'CodeOutlined':() => h(CodeOutlined),
                'UserOutlined':() => h(UserOutlined),
                'MenuOutlined':() => h(MenuOutlined),
                'BarsOutlined':() => h(BarsOutlined),
                'AccountBookOutlined':() => h(AccountBookOutlined),
                'ShopOutlined':() => h(ShopOutlined),
                'HomeOutlined':() => h(HomeOutlined),
                'RobotOutlined':() => h(RobotOutlined),
                'CopyOutlined':() => h(CopyOutlined),
                'FormOutlined':() => h(FormOutlined),
                'ReconciliationOutlined':()=>h(ReconciliationOutlined),
                'FieldTimeOutlined':()=>h(FieldTimeOutlined),
                'MedicineBoxOutlined':() => h(MedicineBoxOutlined),
                'PictureOutlined':() => h(PictureOutlined)
                
            }
        }


    }
}