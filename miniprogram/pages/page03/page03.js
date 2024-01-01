let app = getApp()
Page({
    data: {
        nickname: '未登录', //用户昵称
        //avatar: '', //用户头像
        isLogin: false, //是否登录
        button_content : "登录",
    },
    onLoad() {},
    onShow() {
      if (typeof this.getTabBar === "function" && this.getTabBar()) {
        this.getTabBar().setData({
          current: 2 
        });
      }
    },
    getOpenUserInfo() {
      my.getOpenUserInfo({
          success: (res) => {
              let userInfo = JSON.parse(res.response).response

              console.log(userInfo)

              if(userInfo.nickName == undefined || userInfo.nickName === ""){
                userInfo.nickName = Date.now().toString()
              }
              if(userInfo.avatar == undefined || userInfo.avatar === ""){
                userInfo.avatar = "../../src/default.png"
              }

              console.log(userInfo)

              this.setData({
                  nickname: userInfo.nickName,
                  avatar: userInfo.avatar,
                  isLogin: true,
                  button_content: "已登录" 
              })
              my.test.callFunction({
                  name:"nosql_search",
                  data:{
                      set_name:"users",
                      nickName: userInfo.nickName
                  },
                  success:function(res){
                    if(res.result.data.length === 0 ){
                      my.test.callFunction({
                        name:"nosql_add",
                        data:{
                          set_name:"users",
                          ifo:{
                            nickName: userInfo.nickName,
                            avatar: userInfo.avatar
                          }
                        }
                      })
                    }else{

                    }
                  },
                  fail:function(){
                    console.log("姓名查找失败！")
                  }
              })
              app.globalData.nickName = this.data.nickname
              app.globalData.avatar = this.data.avatar
              app.globalData.isLogin = true
          },
          fail: (err) => {
              my.alert({content: "获取用户信息失败！"})
          }
      });
    },
    handleAuthError(){
        my.alert({content: "登录失败！"})
    }
  });
  