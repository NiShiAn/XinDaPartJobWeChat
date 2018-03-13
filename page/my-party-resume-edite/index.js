/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    dataArr: ['托管老师', '小崔秘书', '小崔暖床','小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊','小崔公司财务总监'],
    imgHead:''
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

  getPhotoImage:function(){
    console.log('asd');
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(">>>>>>>>>>>>"+tempFilePaths);
        that.setData({
          imgHead: tempFilePaths
        });
      }
    })
  }
})
