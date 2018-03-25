/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      //1：轮播图相关配置
      imgUrls: [
'../../image/post/banner1.png',
'../../image/post/banner1.png',
'../../image/post/banner1.png'
      ],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,

      //2:检索分类
      activeTypeId:1,     //切换兼职or全职
      activeSubTypeId:1,  //切换全部区域or雇主等级or岗位分类
      RegionId: 320207,         //选择地区
      EmployerRankId:0,   //选择雇主等级
      JobTypeId:0,        //选择岗位分类
      PageSize: 20,        //分页
      Page: 1,           //分页

      //3:接口返回的岗位数据
      PostList:[],
      IsEnd:false,

      //签到弹窗参数
      showSignModal:false,
      //获取签到信息返回的列表
      SignList:[],
      TodayIsSigned:false,
      TotalValue:0,

      city:""

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
        title: '兼职'
      })
      wx.showShareMenu({
        withShareTicket: true
      })
      this.setData({
        city: options.city
      })  
      this.GetSignInInfo()
      this.getPostList()
    },

    /**
       * 下拉刷新
       * **/
    onPullDownRefresh: function () {
      //this.getPayCourseList();
      wx.stopPullDownRefresh()
    },

    /**
   * 上拉加载
   * **/
    onReachBottom: function () {
      var that = this;
      if (!that.data.IsEnd) {
        that.getPostList();
      } else {
        return
      }
    },

     /**
      * 获取岗位列表
     * **/
    getPostList:function(){
      var that = this;
      var token = wx.getStorageSync('wxToken')
      wx.request({
        url: getApp().data.host + 'api/Job/GetJobList',
        data: {
          'Token': token,
          'Type': that.data.activeTypeId,
          'RegionId': that.data.RegionId,
          'EmployerRankId': that.data.EmployerRankId,
          'JobTypeId': that.data.JobTypeId,
          'PageSize': that.data.PageSize,
          'Page': that.data.Page,
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          if (res.data.Msg) {
            that.setData({
              PostList: res.data.Info.JobInfoList,
              IsEnd: res.data.Info.IsEnd,
            })
          }
        }
      })
    },
    /**
      * 获取签到信息接口
    * **/
    GetSignInInfo:function(){
      var that=this;
      var token = wx.getStorageSync('wxToken')
      wx.request({
        url: getApp().data.host + '/api/SignIn/GetSignInInfo',
        data: {
          'Token': token,
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          if (res.data.Msg) {
            that.setData({
              SignList: res.data.Info.List,
              TodayIsSigned: res.data.Info.TodayIsSigned,
              TotalValue: res.data.Info.TotalValue,
            });
            if (!res.data.Info.TodayIsSigned){
              that.setData({
                showSignModal:true,
              });
            }
          }
        }
      })
    },

    /**
    * 点击签到
    * **/
    SubmitSign:function(){
      var that=this;
      var token = wx.getStorageSync('wxToken')
      wx.request({
        url: getApp().data.host + 'api/SignIn/SignIn',
        data: {
          'Token': token,
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          if (res.data.Msg) {
            that.setData({
              showSignModal: false,
              TodayIsSigned:true
            });
          }
        }
      })
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
      var id = e.currentTarget.dataset.id;
        if(this.data.activeTypeId==1){
            wx.navigateTo({
                url: "/page/part-time-detail/index?postId="+id
            })
        }else{
            wx.navigateTo({
                url: "/page/full-time-detail/index?postId="+id
            })
        }
    },

    /**
    * 点击跳转选择雇主等级
    * **/
    toEmployerGrade: function (e) {
      wx.navigateTo({
        url: "/page/post-employer-grade/index?postId=1"
      })
      this.setData({
        activeSubTypeId: e.currentTarget.dataset.id
      });
    },

    /**
    * 点击跳转选择岗位分类
    * **/
    toPostCategory: function (e) {
      wx.navigateTo({
        url: "/page/post-job-category/index?postId=1"
      })
      this.setData({
        activeSubTypeId: e.currentTarget.dataset.id
      });
    },

    /**
    * 点击全部区域跳转到区域选择
    * **/
    toChooseRegion: function (e) {
      wx.navigateTo({
        url: "/page/post-change-region/index"
      })
      this.setData({
        activeSubTypeId: e.currentTarget.dataset.id
      });
    },

    /**
     * 点击关闭签到弹窗
     * **/
    closeSignModal:function(){
      this.setData({
        showSignModal: false
      });
    },

    /**
    * 点击跳转到搜索页面
    * **/
    toPostCompanySearch: function (e) {
      wx.navigateTo({
        url: "/page/post-company-search/index"
      })
    },
})
