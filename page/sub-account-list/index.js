/************付费课堂页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
    },

    onLaunch: function () {
    },

    /**
     * 初次加载页面配置
     * **/
    onLoad: function (options) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#37383b',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
      wx.setNavigationBarTitle({
        title: '子账号列表'
      })
      wx.showShareMenu({
        withShareTicket: true
      })
    },

    /**
       * 下拉刷新
       * **/
    onPullDownRefresh: function () {
      //this.getPayCourseList();
      wx.stopPullDownRefresh()
    },

    /**
    * 修改新增子账号
    */
    toSubAccountEdit: function () {
      wx.navigateTo({
        url: '/page/sub-account-add/index?subAccountId=1',
      })
    },

    /**
    * 设置子账号权限
    */
    toSubAccountSetting:function(){
      wx.navigateTo({
        url: '/page/sub-account-setting/index?subAccountId=1',
      })
    }

})
