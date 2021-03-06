/************全职页面详情****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      postId: 1,     //岗位Id
      PostInfo: {}   //岗位详细信息
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
      this.setData({
        postId: options.postId
      })
      this.getPostDetail();
    },

    /**
       * 下拉刷新
       * **/
    onPullDownRefresh: function () {
      //this.getPayCourseList();
      wx.stopPullDownRefresh()
    },

    /**
      * 获取岗位详情
    * **/
    getPostDetail: function () {
      var that = this;
      var token = wx.getStorageSync('wxToken')
      wx.request({
        url: getApp().data.host + '/api/Job/GetFullJob',
        data: {
          'Token': token,
          'JobId': that.data.postId
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          if (res.data.Msg) {
            that.setData({
              PostInfo: res.data.Info,
            });
          }
        }
      })
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
