/************简历选择区域页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      //2:检索分类
      activeTypeId:1,     //切换兼职or全职
      activeSubTypeId:1,  //切换全部区域or岗位分类or学历层次or时间顺序or性别
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
      this.setData({
        activeTypeId: options.tyepId
      }) 
      this.setData({
        activeSubTypeId: options.subTypeId
      }) 
      var title=""
      if (options.subTypeId == 1) {
        title = "全部区域"
      } else if (options.subTypeId == 2){
        title = "岗位分类"
      } else if (options.subTypeId == 3) {
        title = "学历层次"
      } else if (options.tyepId == 1){
        title = "性别"
      }else{
        title = "时间顺序"
      }
      wx.setNavigationBarTitle({
        title: title
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
})
