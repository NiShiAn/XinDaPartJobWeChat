/************岗位首页页面****************/
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
        title: '特工列表'
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
    * 点击跳转到特工详情页面
    * **/
    toSpecialAgentDetail: function (e) {
      wx.navigateTo({
        url: "/page/special-agent-detail/index"
      })
    },
})
