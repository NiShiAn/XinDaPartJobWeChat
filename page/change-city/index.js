/************个人中心页面详情****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    cityInfoList:[],
  },

  onLaunch: function () {
  },

  /**
   * 初次加载页面配置
   * **/
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#37383b',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    }),
    wx.setNavigationBarTitle({
      title: '切换城市'
    }),
    wx.showShareMenu({
      withShareTicket: true
    }),
    this.getCityList();  
  },

  /**
   * 获取城市列表
   */

  getCityList:function(){
    var that = this;
    var token = wx.getStorageSync('wxToken');
    wx.request({
      url: getApp().data.host + 'api/Region/GetCityList',
      data: {
        // "Phone": that.data.phoneNum,
        // "VerifyCode": that.data.codeNumber,
        // "Token": token
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(JSON.stringify(res.data))
        if (res.data.Msg) {
          that.setData({
            cityInfoList: res.data.Info
          });
        }
      }
    })
  }
})
