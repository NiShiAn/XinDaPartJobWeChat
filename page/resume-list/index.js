/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      //2:检索分类
      activeTypeId:1,     //切换兼职or全职
      activeSubTypeId:1,  //切换全部区域or雇主等级or岗位分类
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
        title: '人才'
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
     * 点击tab切换兼职&&全职
     * **/
    tabChangeTypeClick: function (e) {
      this.setData({
        activeTypeId: e.currentTarget.dataset.id
      });
    },

    /**
     * 点击二级分类切换
     * 1：全部区域
     * 2：雇主等级
     * 3：岗位分类
     * **/
    tabChangeSubTypeClick: function (e) {
      this.setData({
        activeSubTypeId: e.currentTarget.dataset.id
      });
    },

    /**
     * 点击跳转到详情页面
     * 判断是跳转到岗位详情or兼职详情
     * **/
    toDetailTap: function (e) {
        if(this.data.activeTypeId==1){
            wx.navigateTo({
              url: "/page/part-resume-detail/index?postId=1"
            })
        }else{
            wx.navigateTo({
              url: "/page/full-resume-detail/index?postId=1"
            })
        }
    },

    /**
    * 兼职简历：1：全部区域 2：岗位分类 3：学历层次 4：性别
    * 全职简历：1：全部区域 2：岗位分类 3：学历层次 4：时间
    * **/
    toChooseCondition: function (e) {
      var id = e.currentTarget.dataset.id;
      this.setData({
        activeSubTypeId: e.currentTarget.dataset.id
      });
        wx.navigateTo({
          url: "/page/resume-change-condition/index?tyepId=" + this.data.activeTypeId+"&subTypeId="+id
        })
    },

    /**
     * 点击跳转到简历搜索页面
     * 1:兼职简历：
     * 2:全职简历：
    * **/
    toSearchPage:function(){
      wx.navigateTo({
        url: "/page/resume-search/index?tyepId=" + this.data.activeTypeId
      })
    }
})
