<!-- // get请求获取code

// 将codepost发送给login接口

// 返回授权结果 true：授权成功 跳转到指定页面

// 返回授权结果 false： 授权失败 跳转到指定提示页面 去开通；

code = request.args.get('code')               # 获取链接地址参数

token_res_msg = AccessToken().Toolapp(code)   # 获取token后，写入数据库，写入session

session['data'] = token_res_msg.get('data')   # 获取token后，写入数据库，写入session

shop_id = token_res_msg.get('data').get('shop_id')    # shop_id

material_object_id = Douyin_login_auth().select_material_folder()   # 新建默认素材文件夹

Douyin_login_auth().Douyin_default_material_id_add(material_object_id, shop_id) # 添加默认文件夹ID到数据库

session.permanent = True                                    # 配置session有效时间

return redirect(url_for('douyincopy.itemdetaile'))            # 跳转至批量修改页面 -->