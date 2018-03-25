var countdown = 60;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      is_show: true
    })
    countdown = 60;
    return;
  } else {
    that.setData({
      is_show: false,
      last_time: countdown
    })

    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }
    , 1000)
}
var P = require('../../lib/wxpage')
P('index', {
  data: {
    last_time: '',
    is_show: true,
    phone: "",
    verify: "",
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
  * 获取用户输入的用户名
  * **/
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  /**
  * 获取用户输入的验证码
  * **/
  verifyInput: function (e) {
    this.setData({
      verify: e.detail.value
    })
  },

  /**
  * 点击获取验证码
  * **/
  GetVerify: function () {
    console.log(111)
    var that = this;
    // 将获取验证码按钮隐藏60s，60s后再次显示
    if (that.data.phone == "") {
      wx.showToast({
        title: '请填写手机号~',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.request({
      url: getApp().data.host + 'api/Account/GetPhoneCode',
      data: {
        "Phone": that.data.phone
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        if (res.data.Msg) {
          that.setData({
            is_show: (!that.data.is_show)  //false
          })
          settime(that);
        } else {
          wx.showToast({
            title: res.data.Message,
            duration: 2000
          })
        }
      }
    })
  },

  /**
  * 点击保存
  * **/
  SaveAccount: function () {
    var that = this;
    var token = wx.getStorageSync('wxToken')
    // 将获取验证码按钮隐藏60s，60s后再次显示
    if (that.data.phone == "") {
      wx.showToast({
        title: '请填写手机号~',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (that.data.verify == "") {
      wx.showToast({
        title: '请填写验证码~',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.request({
      url: getApp().data.host + 'api/EP/AddOrEditAccount',
      data: {
        "Token": token,
        "Phone": that.data.phone,
        "VerifyCode": that.data.verify,
        "SubAccoundId": 0,
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        if (res.data.Msg) {
          wx.navigateTo({
            url: "/page/sub-account-list/index"
          })
        } 
      }
    })
  },
})