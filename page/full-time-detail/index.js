/************全职页面详情****************/
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
        title: '全职岗位详情'
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
     * 点击跳转到举报页面
     * **/
    toTipOffTap: function (e) {
      wx.navigateTo({
        url: "/page/tip-off-add/index?postId=1"
      })
    },

    /**
     * 点击跳转到企业详情
     * **/
    goCompanyDetail: function (e) {
      wx.navigateTo({
        url: "/page/company-detail/index?postId=1"
      })
    },

    /**
     * 点击去投资简历
     * **/
    toDeliveryResume: function () {
      wx.navigateTo({
        url: "/page/delivery-resume-list/index"
      })
    }
})
