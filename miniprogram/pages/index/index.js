let app = getApp()
// 
Page({
    data:{
        longitude:109.41,
        latitude:24.326442,
        scale:13,
        mapCtx: null,
        search_ifo: [],
        showList: true,
        place_name: ""
    },
    onReady() {
      // 使用 my.createMapContext 获取 map 上下文
      this.data.mapCtx= my.createMapContext('map');
    },
    onShow() {
        if (typeof this.getTabBar === "function" && this.getTabBar()) {
          this.getTabBar().setData({
            current: 0 
          });
        }
      },
    onLoad(){
        
    },
    onConfirm(value, e){
      this.search(value)
    },
    cancel(){
      this.setData({
        showList: true,
        search_ifo: []
      })
    },

    search(value){
      let that = this
      my.request({
        url: '',
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          that.setData({
            search_ifo: res.data.tips,
            showList: false
          })
        },
        fail: function (res) {
          my.alert({ content: '查找失败！' });
        }
      });
    },
    handleTap(e){
      let index = parseInt(e.currentTarget.dataset.info)
      let parts = this.data.search_ifo[index].location.split(',');
      let num1 = parseFloat(parts[0]);
      let num2 = parseFloat(parts[1]);
      this.setData({
        place_name: this.data.search_ifo[index].name
      })
      this.data.mapCtx.updateComponents({
        longitude: num1,
        latitude: num2-0.003,
        scale: 13,
        'markers':[{
          id: 1,
          longitude: num1,
          latitude: num2,
          width: 38,
          height: 62,
          iconPath: 'https://gw.alipayobjects.com/mdn/rms_dfc0fe/afts/img/A*x9yERpemTRsAAAAAAAAAAAAAARQnAQ',
          "customCallout":{
            "type": 2,
            "descList": [{
              "desc": this.data.search_ifo[index].name,
              "descColor": "#333333"
            }],
            "isShow": 1
          },
          markerLevel: 2,
        }],
      })
    },
    tapLabel(e){
      app.globalData.location = this.data.place_name
      app.globalData.isSelectedCity = true
      my.switchTab({
        url: '/pages/page02/page02',
    })
    }
})