/************付费课堂页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      AccountCount:0,
      AccountId:0,
      Logo:'',
      Name:'',
      Phone:'', 
      VipType:0,
      SubAccountList: [],
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
        title: '子账号列表'
      })
      wx.showShareMenu({
        withShareTicket: true
      })
      this.getSubAccountList();
    },

    /**
       * 下拉刷新
       * **/
    onPullDownRefresh: function () {
      //this.getPayCourseList();
      wx.stopPullDownRefresh()
    },

    /**
    * 获取招聘联系人列表
    */
    getSubAccountList: function () {
      var token = wx.getStorageSync('wxToken')
      var that = this;
      wx.request({
        url: getApp().data.host + '/api/EP/GetAccountList',
        data: {
          'Token': token
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          that.setData({
            AccountCount: res.data.Info.AccountCount,
            AccountId: res.data.Info.AccountId,
            Logo: res.data.Info.Logo,
            Name: res.data.Info.Name,
            Phone: res.data.Info.Phone,
            VipType: res.data.Info.VipType,
            SubAccountList: res.data.Info.SubAccountList,
          });
        }
      })
    },

    /**
    * 修改新增子账号
    */
    toSubAccountEdit: function () {
      wx.navigateTo({
        url: '/page/sub-account-add/index?subAccountId=1',
      })
    },

    /**
    * 设置子账号权限
    */
    toSubAccountSetting:function(){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/page/sub-account-setting/index?subAccountId='+id,
      })
    }

})
