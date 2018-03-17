/************企业中心页面详情****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    headImg: '',
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
      title: '企业中心'
    }),
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  //发布兼职按钮
  goPartJob: function () {
    wx.navigateTo({
      url: '/page/company-release-part-job/index',
    })
  },
  //发布全职按钮 
  goFullJob: function () {
    wx.navigateTo({
      url: '/page/company-release-full-job/index',
    })
  },
  //跳转智能岗位、平台推荐岗位、面试邀请记录、已投递的岗位
  goJobList: function 　(e) {
    if (e.currentTarget.dataset.id=='1'){
      wx.navigateTo({
        url: '/page/company-job-list/index',
      })
    }else{
      wx.navigateTo({
        url: '/page/alr-pay-resume-list/index?jobType=' + e.currentTarget.dataset.id,
      })
    }
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
  },
  /**
   * 跳转到企业认证 1：编辑 2：进行中 3：已认证
   */
  goCompanyAudit: function (e) {
    if (e.currentTarget.dataset.id == '1') {
      wx.navigateTo({
        url: '/page/company-audit-edite/index',
      })
    } else if (e.currentTarget.dataset.id == '2') {
      wx.navigateTo({
        url: '/page/company-audit-statues/index',
      })
    } else {
      wx.navigateTo({
        url: '/page/company-audit-finished/index',
      })
    }
    
  }
})
