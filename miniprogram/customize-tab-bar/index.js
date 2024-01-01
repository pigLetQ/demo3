Component({
    data: {
        current: 0,
        tabs: [
          {
            icon: 'TravelOutline',
            activeIcon: 'LocationFill',
            text: '地图',
            pagePath: "/pages/index/index",
          },
          {
            icon: 'MessageOutline',
            activeIcon: 'KoubeiFill',
            text: '留言板',
            pagePath: "/pages/page02/page02",
          },
          {
            icon: 'UserOutline',
            activeIcon: 'SmileFill',
            text: '我的',
            pagePath: "/pages/page03/page03",
          },
        ],
    },
    methods:{
        handleChange(index) {
            my.switchTab({
                url:this.data.tabs[index].pagePath
            });
          },
    },
});
  