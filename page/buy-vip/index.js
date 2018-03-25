/************企业登录页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      vipListInfo:[],
      vipItemInfo:{},
      clickNum:0,
      buyPrice:"0",
    },

    onLaunch: function () {
    },

    onShow:function(){
      this.getVipInfo();
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
        title: '兼职详情'
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

    getVipInfo:function(){
      var that = this;
      var token = wx.getStorageSync('wxToken');
      wx.request({
        url: getApp().data.host + 'api/Vip/GetVipList',
        data: {
          Token: token,
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          console.log(JSON.stringify(res.data))
          if (res.data.Msg) {
            that.setData({
              vipListInfo: res.data.Info,
              buyPrice: res.data.Info[0].NewPrice
            });
            that.getVipItemInfo(res.data.Info,0)
          }
        }
      })
    },
  /**
   * 获取点击会员的信息
   */
    getVipItemInfo:function(e,index){
      var that = this;
      var token = wx.getStorageSync('wxToken');
      wx.request({
        url: getApp().data.host + 'api/Vip/GetVipInfo',
        data: {
          Token: token,
          VipInfoId: e[index].VipInfoId
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          console.log(JSON.stringify(res.data))
          if (res.data.Msg) {
            that.setData({
              vipItemInfo: res.data.Info
            })
          }
        }
      })
    },
    /**
     * 会员点击事件
     */

    clickVip:function(e){
      var index = parseInt(e.currentTarget.dataset.id);
      var buyPrice = this.data.vipListInfo[index].NewPrice;
      this.setData({
        clickNum: e.currentTarget.dataset.id,
        buyPrice: buyPrice
      })
      this.getVipItemInfo(this.data.vipListInfo, index);
    }
})
