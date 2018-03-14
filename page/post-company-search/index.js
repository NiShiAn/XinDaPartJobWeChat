/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      //2:检索分类
      activeTypeId:1,     //切换兼职or全职
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
        title: '岗位企业搜索'
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
     * 点击tab切换岗位&&企业
     * **/
    tabChangeTypeClick: function (e) {
      this.setData({
        activeTypeId: e.currentTarget.dataset.id
      });
      if (this.data.activeTypeId == 1) {
        wx.navigateTo({
          url: "/page/post-search-result/index?postId=1"
        })
      } else {
        wx.navigateTo({
          url: "/page/company-search-result/index?postId=1"
        })
      }
    },

    /**
     * 1:跳转到岗位搜索结果页面
     * 2:跳转到企业搜索结果页面
     * **/
    toResultTap: function (e) {
      if (this.data.activeTypeId == 1) {
        wx.navigateTo({
          url: "/page/post-search-result/index?postId=1"
        })
      } else {
        wx.navigateTo({
          url: "/page/company-search-result/index?postId=1"
        })
      }
    },
})
