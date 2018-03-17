/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    dataArr: ['托管老师', '小崔秘书', '小崔暖床','小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊','小崔公司财务总监'],
    imgHead:'../../image/post/add.png',//用户头像
    viewType: '1',//３：编辑  2：预览  1: 新增 默认新增
  },

  onLaunch: function (e) {
    
  },

  /**
   * 初次加载页面配置
   * **/
  onLoad: function (options) {

    console.log("-----feedback--test--" + options.resumeType);
    this.setData({
      viewType:options.resumeType
    })

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
  //更换头像
  getPhotoImage:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          imgHead: tempFilePaths
        });
      }
    })
  },
  //跳转相关添加信息页面
  /**
   * 1:添加基本信息
   * 2:添加教育信息
   * 3:添加求职信息
   */
  goAddView:function (e){
    switch (e.currentTarget.dataset.id) {
      case '1':
        wx.navigateTo({
          url: '/page/add-base-info/index',
        })
        break;
      case '2':
        wx.navigateTo({
          url: '/page/add-edu-info/index',
        })
        break;
      case '3':
        wx.navigateTo({
          url: '/page/add-work-info/index',
        })
        break;
      default:
        break;
    }
  }

})
