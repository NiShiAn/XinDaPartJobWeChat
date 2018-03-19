var d = new Date()
require('./lib/wxpage').A({
  data: {
    host: 'https://partjobapi.nbig.com.cn/',
  },
  config: {
    route: '/pages/$page',
  },
  onLaunch: function (opts) {
    this.login();
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShow: function () {
    // Do something
  },
  login: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: () => {
            },
            fail() {
            },
            complete() {
            }
          })
        }
      }
    })
    that.registerUser();
    wx.login({
      success: function (res) {
        var wxUserInfo = wx.getStorageSync('wxUserInfo')
        wx.request({
          url: that.data.host + 'api/Account/GetUserInfo',
          data: {
            'Code': res.code,
            'HeadImg': wxUserInfo.avatarUrl,
            'UserName': wxUserInfo.nickName,
            'City': '0532',
          },
          method: 'POST',
          dataType: 'json',
          success: function (res) {
            if (res.data.Msg) {
              wx.setStorageSync('wxUserId', res.data.Info.UserId);
              wx.setStorageSync('wxOpenId', res.data.Info.OpenId);
              wx.setStorageSync('wxToken', res.data.Info.Token);
            }
          }
        })
      }
    })

  },
  // 调用微信接口，获取地图上的地理位置
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            try {
              wx.setStorageSync('wxUserInfo', res.userInfo);
            } catch (e) {
            }
          }
        })
      }
    })
  },
})
