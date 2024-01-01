let app = getApp()

Page({
    data: {
      isEmpty : true,
      closeVisible: false,
      showmodal1: false,
      showmodal2: false,
      list:[]
    },
    onLoad(){
      
    },
    onShow() {
      if (typeof this.getTabBar === "function" && this.getTabBar()) {
        this.getTabBar().setData({
          current: 1 
        });
      }
      my.setNavigationBarTitle({
        title: app.globalData.location
      })
      this.search()
    },
    search(){
      if(app.globalData.isSelectedCity){
        let that = this
        my.test.callFunction({
          name:"nosql_search_place",
          data:{
              set_name:"place",
              location:app.globalData.location
          },
          success:function(res){
            that.setData({
              list: res.result.data
            })     
          },
          fail:function(){
            console.log("地点查找失败！")
          },
          complete:function(){
            if(that.data.list.length !== 0){
              that.setData({
                isEmpty: false
              })
            }else{
              that.setData({
                isEmpty: true
              })
            }
          }
        })
      }
    },
    creatMessage(){
      if(app.globalData.isLogin === false){
        this.setData({
          showmodal1: true,
        })
      }else if(app.globalData.isSelectedCity === false){
        this.setData({
          showmodal2: true,
        })
      }
      else{
        this.setData({
          closeVisible: true,
        })
      }

    },
    cancelMessage(){
      this.setData({ closeVisible: false })
    },
    handlePrimaryButtonTap_1(){
      this.setData({
        showmodal1: false,
      })
      my.switchTab({
        url:"../page03/page03"
    })
    },
    handleSecondaryButtonTap_1(){
      this.setData({
        showmodal1: false,
      })
    },
    handlePrimaryButtonTap_2(){
      this.setData({
        showmodal2: false,
      })
      my.switchTab({
        url:"../index/index"
    })
    },
    handleSecondaryButtonTap_2(){
      this.setData({
        showmodal2: false,
      })
    },
    getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
  
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    bindFormSubmit(e) {
      this.setData({
        closeVisible: false,
        isEmpty: false
      })

      let that = this
      my.test.callFunction({
        name:"nosql_add",
        data:{
          set_name:"place",
          ifo:{
            location: app.globalData.location,
            nickName: app.globalData.nickName,
            avatar: app.globalData.avatar,
            time: this.getCurrentDateTime(),
            content: e.detail.value.textarea
          }
        },
        complete:function(){
          that.search()
        }
      })
    },
  },
);
