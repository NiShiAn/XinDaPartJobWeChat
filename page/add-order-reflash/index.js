/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    arrayNumber: ['美国', '中国', '巴西', '日本'],
    arrayDay: ['美国', '中国', '巴西', '日本'],
    indexNumber: 0,
    indexDay: 0,
    date:"2015-09-01",
    time:"09:01"
  },

  bindPickerChangeNumber: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexNumber: e.detail.value
    })
  },

  bindPickerChangeDay: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexDay: e.detail.value
    })
  },
 
  actionSheetClick:function(){
    wx.showActionSheet({
      itemList: ['10分钟', '15分钟', '30分钟', '1小时',"2小时",'3小时'],
      success: function (res) {
        //提交分钟
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
})
