/************付费课堂页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      subAccountId:0,        //子账号id
      SunAccountSetting:[]   //子账号权限列表
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
        title: '子账号设置'
      })
      wx.showShareMenu({
        withShareTicket: true
      })
      this.setData({
        subAccountId: options.subAccountId
      })  
      this.getSubAccountSetting();
    },

    /**
    * 下拉刷新
    * **/
    onPullDownRefresh: function () {
      //this.getPayCourseList();
      wx.stopPullDownRefresh()
    },

   /**
    * 获取子账号权限
    * **/
    getSubAccountSetting:function(){
      var token = wx.getStorageSync('wxToken')
      var that = this;
      wx.request({
        url: getApp().data.host + '/api/EP/GetAccountPermission',
        data: {
          'Token': token,
          'SubAccoundId': that.data.subAccountId
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          that.setData({
            SunAccountSetting: res.data.Info,
          });
        }
      })
    },

    /**
    * 修改子账号权限
    * **/
    updateSetting:function(e){
      var token = wx.getStorageSync('wxToken')
      var that = this;
      wx.request({
        url: getApp().data.host + '/api/EP/SaveAccountPermission',
        data: {
          'Token': token,
          'MenuId': 1,
          'IsUsed': false,
          'SubAccoundId': that.data.subAccountId,
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
         ///TODO：修改列表数据
        }
      })
    },

    /**
   * 注销子账号
   * **/
    deleteSubAccount: function (e) {
      var token = wx.getStorageSync('wxToken')
      var that = this;
      wx.request({
        url: getApp().data.host + '/api/EP/DelAccount',
        data: {
          'Token': token,
          'SubAccoundId': that.data.subAccountId,
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          wx.showToast({
            title: res.data.Message,
            duration: 2000
          })
        }
      })
    },

})
