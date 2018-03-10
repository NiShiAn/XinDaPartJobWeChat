/************个人中心页面详情****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    headImg: '',
    isShowInput:2,
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
      title: '个人中心'
    }),
    wx.showShareMenu({
      withShareTicket: true
    })   
  },

  searchClick:function(){
    console.log('1')
    this.setData({
      isShowInput:2
    });
  },

  disappearBlur:function(){
    console.log('2')
    this.setData({
      isShowInput: 0
    });
  }

})
