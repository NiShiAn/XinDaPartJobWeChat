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
        title: '兼职'
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
     * 点击跳转到详情页面
     * 判断是跳转到岗位详情or兼职详情
     * **/
    toDetailTap: function (e) {
        if(this.data.activeTypeId==1){
            wx.navigateTo({
                url: "/page/part-time-detail/index?postId=1"
            })
        }else{
            wx.navigateTo({
                url: "/page/full-time-detail/index?postId=1"
            })
        }
    },
})
