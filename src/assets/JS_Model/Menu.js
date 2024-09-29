/** 导航菜单类 **/
import {h} from "vue";
import {CodeOutlined} from "@ant-design/icons-vue";

export class Menu {

    LoadMenu={
        // 一级菜单
        fristlive:(data)=>{
          var menu_list = []
          for (var i=0;i<data.length;i++){

            var m_obj = data[i]
            var child = m_obj.child;

            // 一级菜单
            var menu_detaile_obj = this.LoadMenu.first_childlive(m_obj)

            if(child.length > 0){
                var child_list = []
                for(let y of child){
                    var child_obj =  this.LoadMenu.childlive(y)
                    child_obj.key = y.id + ''
                    child_list.push(child_obj)
                }
                menu_detaile_obj.key = 'sub' + i
                menu_detaile_obj.children = child_list

            }else {
                menu_detaile_obj.key = i.toString()

            }

            menu_list.push(menu_detaile_obj)
          }
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
            menu_detaile_obj.icon=() => h(CodeOutlined)
            menu_detaile_obj.label=data.name
            menu_detaile_obj.title=data.name
            return menu_detaile_obj
        }
    }
}