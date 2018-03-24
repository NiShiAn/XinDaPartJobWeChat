/************付费课堂页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      //招聘联系人列表
      ContactList:[]
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
        title: '联系人列表'
      })
      wx.showShareMenu({
        withShareTicket: true
      })
      this.getContactList();
    },

    /**
       * 下拉刷新
       * **/
    onPullDownRefresh: function () {
      //this.getPayCourseList();
      wx.stopPullDownRefresh()
    },

    /**
    * 删除招聘联系人
    */
   toContactDelete:function(e){
     var id = e.currentTarget.dataset.id;
     var index = e.currentTarget.dataset.index;
     var token = wx.getStorageSync('wxToken')
     var that=this;
     wx.request({
       url: getApp().data.host + '/api/EP/DelEPContacts',
       data: {
         'Token': token,
         'EPContactsId':id
       },
       method: 'POST',
       dataType: 'json',
       success: function (res) {
         that.getContactList();
       }
     })
   },
    /**
    * 编辑招聘联系人
    */
    toContactEdit: function (e) {
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/page/contacts-edit/index?contactId='+id,
      })
    },

    /**
    * 获取招聘联系人列表
    */
    getContactList:function(){
      var token = wx.getStorageSync('wxToken')
      var that=this;
      wx.request({
        url: getApp().data.host + '/api/EP/GetEPContacts',
        data: {
          'Token': token
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          that.setData({
            ContactList: res.data.Info,
          });
        }
      })
    }
})
