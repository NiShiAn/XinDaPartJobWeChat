/************付费课堂页面****************/
var P = require('../../lib/wxpage')
P('index', {
  data: {
    addressList:[],
  },

  onLaunch: function () {
  },

  onShow:function(){
    this.getAddressInfo();
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
      title: '多地址管理列表'
    })
    wx.showShareMenu({
      withShareTicket: true
    });

  },

  /**
     * 下拉刷新
     * **/
  onPullDownRefresh: function () {
    //this.getPayCourseList();
    wx.stopPullDownRefresh()
  },

  /**
   * 获取地址列表
   */

  getAddressInfo:function(){
    var that = this;
    var token = wx.getStorageSync('wxToken');
    wx.request({
      url: getApp().data.host + 'api/EPAddress/GetAddressList',
      data: {
        Token: token
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(JSON.stringify(res.data))
        if (res.data.Msg) {
          that.setData({
            addressList: res.data.Info
          });
        }
      }
    })
  },

  /**
   * 新增工作地址
   */
    toAddressAdd: function () {
      // wx.navigateTo({
      //   url: '/page/address-add/index',
      // })
      var that = this;
      var token = wx.getStorageSync('wxToken');
      wx.chooseLocation({
        success:function(e){
          console.log(JSON.stringify(e));
          if(e.name==null || e.name==''){
            wx.showToast({
              title: '请重新勾选下面地区',
            });
            return
          }
          wx.request({
            url: getApp().data.host + 'api/EPAddress/AddEPAddress',
            data: {
              Token: token,
              Address:e.address,
              Lng: e.longitude,
              Lat: e.latitude,
              Type: 0
            },
            method: 'POST',
            dataType: 'json',
            success: function (res) {
              console.log(JSON.stringify(res.data))
              if (res.data.Msg) {
                that.setData({
                  addressList: res.data.Info
                });
              }
            }
          })
        }
      })
    },

    /**
     * 删除地址
     */

    deleteAddress:function(){
      var that = this;
      var token = wx.getStorageSync('wxToken');
      var addressId = e.currentTarget.dataset.id;
      wx.request({
        url: getApp().data.host + 'api/EPAddress/DelEPAddress',
        data: {
          Token: token,
          AddressId: addressId
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          if (res.data.Msg) {
            that.getAddressInfo();
          }
        }
      })
    }
})

