
App({
    globalData:{
      isLogin : false,
      location: "留言板",
      isSelectedCity : false
    },
    async onLaunch(options) {
        const context = my.cloud.createCloudContext({
            // env是直接云开发环境对应的ID,关联什么环境填写什么环境的ID，填写错误会报错
             // 需要与cloud关联的环境相对应
            env: 'env-00jx4xnavw80'
          });
          // 初始化云环境
          // 参考：https://opendocs.alipay.com/pre-open/071w10?pathHash=e37eeef7
          context.init();
          // 设置context的调用方法,my.后面的名称可以自定义，也可以不定义
          my.test = context;
    },
    onShow(options) {
      // 从后台被 scheme 重新打开
      // options.query == {number:1}
    },
  });
