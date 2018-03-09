/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    dataArr: ['托管老师', '小崔秘书', '小崔暖床','小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊','小崔公司财务总监']
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
      title: '兼职简历编辑'
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  
})
