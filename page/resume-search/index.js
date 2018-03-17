/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      activeTypeId:1,    //1:兼职简历  2：全职简历
      keywords: "",      //简历搜索关键词
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
        title: '搜索'
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
     * 1:跳转到岗位搜索结果页面
     * 2:跳转到企业搜索结果页面
     * **/
    toSeatchTap: function (e) {
      var keywords = e.detail.value;
      if (this.data.activeTypeId == 1) {
        wx.navigateTo({
          url: "/page/resume-search-result/index?keywords="+keywords+"&typeId=1"
        })
      } else {
        wx.navigateTo({
          url: "/page/resume-search-result/index?keywords=" + keywords + "&typeId=1"
        })
      }
    },

    /**
     * 点击取消搜索
     * **/
    cancleSearch:function(){
      this.setData({
        keywords: ""
      });
      
    }
})
