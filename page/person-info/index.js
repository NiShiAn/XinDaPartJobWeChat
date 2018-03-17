/************个人中心页面详情****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    headImg:'',
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
    }),
    
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            var simpleUser = res.userInfo;
            console.log(simpleUser);
            that.setData({
              headImg: simpleUser.avatarUrl
            })
          }
        });
      }
    });
  },
  //我的兼职简历按钮
  goPartResume: function () {
    wx.navigateTo({
      url: '/page/my-party-resume-list/index',
    })
  },
  //我的全职简历按钮 
  goFullResume: function () {
    wx.navigateTo({
      url: '/page/my-full-resume-detail/index',
    })
  },
  //跳转智能岗位、平台推荐岗位、面试邀请记录、已投递的岗位
  goJobList: function　(e) {
    wx.navigateTo({
      url: '/page/recommend-job-list/index?jobType=' + e.currentTarget.dataset.id,
    })
  },
  //我的举报页面
  goReportView: function () {
    wx.navigateTo({
      url: '/page/my-report-list/index',
    })
  },
  //切换城市列表
  goChangeCity: function () {
    wx.navigateTo({
      url: '/page/change-city/index',
    })
  }
})
