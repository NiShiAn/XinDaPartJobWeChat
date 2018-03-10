/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    dataArr: ['托管老师', '小崔秘书', '小崔暖床', '小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊', '小崔公司财务总监'],
    length: 6,
    region: ['广东省', '广州市', '海珠区'],
    index: 0
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
      title: '职位信息'
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }
})
