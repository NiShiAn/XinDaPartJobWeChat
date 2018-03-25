/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      ResumeList:[],    //投递简历列表
      selectResumeId:0,
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
      this.GetUserPostPartCVList()
    },

    /**
       * 下拉刷新
       * **/
    onPullDownRefresh: function () {
      //this.getPayCourseList();
      wx.stopPullDownRefresh()
    },
  
    /**
      * 投递岗位，简历列表
    * **/
    GetUserPostPartCVList:function(){
      var token = wx.getStorageSync('wxToken')
      var that = this;
      wx.request({
        url: getApp().data.host + 'api/Job/GetUserPostPartCVList',
        data: {
          'Token': token,
          'JobCategoryName':'财务总监'
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          that.setData({
            ResumeList: res.data.Info,
          });
        }
      })
    },

    /**
     * 选择简历Id
     * **/
    selectResume:function(){
      var id = e.currentTarget.dataset.id;
      that.setData({
        selectResumeId: id,
      });
    },

    /**
     * 点击投递简历
     * **/
    deliveryPost:function(){
      var that=this;
      if (that.data.selectResumeId==0){
        wx.showToast({
          title: '请先选择简历',
          duration: 2000
        })
      }else{
        var token = wx.getStorageSync('wxToken')
        wx.request({
          url: getApp().data.host + 'api/Job/UserPostCV',
          data: {
            'Token': token,
            'CVId': that.data.selectResumeId
          },
          method: 'POST',
          dataType: 'json',
          success: function (res) {
            wx.showToast({
              title: '投递成功',
              duration: 2000
            })
            if (this.data.activeTypeId == 1) {
              wx.navigateTo({
                url: "/page/part-time-detail/index?postId=1"
              })
            } else {
              wx.navigateTo({
                url: "/page/full-time-detail/index?postId=1"
              })
            }
          }
        })
      }
    },
})
