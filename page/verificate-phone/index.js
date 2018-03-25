/************付费课堂页面****************/
var P = require('../../lib/wxpage');
var util = require('../../util/util');
P('index', {
  data: {
    codeTime: '获取验证码',
    btnStatues: false,
    phoneNum: "",//用户输入的手机号码
    codeNumber: "",//数据获取的验证码
    popErrorMsg:""
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
      title: '添加手机号'
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
   * 获取手机验证吗
   */

  getCode: function (e) {
    console.log(this.data.phoneNum);
    var phone = this.data.phoneNum;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      // wx.showToast({
      //   title: '手机号码有误',
      // });
      // wx.setTopBarText({
      //   text: 'hello, world!'
      // })
      this.setData({
        popErrorMsg:"手机号码有误"
      });
      util.ohShitfadeOut(this);
      return
    }
    var that = this;
    var timeNum = 60;
    var tiemr = setInterval(function () {
      timeNum--;
      that.setData({
        codeTime: timeNum + "后重新获取",
        btnStatues: true
      })
      if (timeNum == 0) {
        clearInterval(tiemr);
        that.setData({
          codeTime: "重新获取",
          btnStatues: false
        })
      }
    }, 1000);
    wx.request({
      url: getApp().data.host + 'api/Account/GetPhoneCode',
      data: {
        'Phone': this.data.phoneNum,
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(JSON.stringify(res.data))
        if (res.data.Msg) {

        }
      }
    })
  },

  /**
   * 获取验证码
   */
  phoneNumInput: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },

})
