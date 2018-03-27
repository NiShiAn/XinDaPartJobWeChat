/************付费课堂页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      ReportReasonList:[]     //举报列表
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
        title: '岗位举报'
      })
      wx.showShareMenu({
        withShareTicket: true
      })
      this.GetReportReasonList();
    },

    /**
      * 下拉刷新
    * **/
    onPullDownRefresh: function () {
      //this.getPayCourseList();
      wx.stopPullDownRefresh()
    },

    /**
    * 获取举报原因列表
    */
    GetReportReasonList: function () {
      var token = wx.getStorageSync('wxToken')
      var that = this;
      wx.request({
        url: getApp().data.host + 'api/Report/GetReportReason',
        data: {
          'Token': token,
          'Type':2        //1:简历，2：岗位
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          that.setData({
            ReportReasonList: res.data.Info,
          })
        }
      })
    },

   /**
    * 岗位举报
    */
    ReportPost:function(){
      var token = wx.getStorageSync('wxToken')
      var that = this;
      wx.request({
        url: getApp().data.host + 'api/Report/ReportJob',
        data: {
          'Token': token,
          'JobId': 2,   
          'UserName': 2,   
          'JobName': 2,   
          'EPName': 2,    
          'EPId': 2,    
          'ReasonIds': 2,      
          'Reasons': 2,    
          'Note': 2,    
          'NoteImgUrl': 2,       
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          wx.showToast({
            title: '举报成功',
            duration: 2000
          })
        }
      })
    }
})
