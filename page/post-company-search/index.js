/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      activeTypeId:1,   //1:岗位；2：企业
      keywords:""       //搜索关键词
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
          url: "/page/post-search-result/index?keywords=" + this.data.keywords
        })
      } else {
        wx.navigateTo({
          url: "/page/company-search-result/index?keywords=" + this.data.keywords
        })
      }
    },

    // /**
    //  * 文本框失去焦点时,搜索列表
    //  * **/
    // bindSearch:function(e){
    //   var keywords = e.detail.value;
    //   this.setData({
    //     keywords: keywords
    //   });
    //   if (this.data.activeTypeId == 1) {
    //     wx.navigateTo({
    //       url: "/page/post-search-result/index?keywords=" + keywords
    //     })
    //   } else {
    //     wx.navigateTo({
    //       url: "/page/company-search-result/index?keywords="+keywords
    //     })
    //   }
    // },

    /**
     * 取消搜索
     * **/
    cancleSearch:function(){
      this.setData({
        keywords: ""
      });
    }
})
