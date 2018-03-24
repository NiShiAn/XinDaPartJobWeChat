/************付费课堂页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      contactId:0,
      EPContactsName:'',
      IsAuth: false,
      Phone: '',
      ShowUrl:'',
      SaveUrl:''
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
        title: '编辑联系人'
      })
      wx.showShareMenu({
        withShareTicket: true
      })
      this.setData({
        contactId: options.contactId
      })  
      this.getContactInfo(); 
    },

    /**
       * 下拉刷新
       * **/
    onPullDownRefresh: function () {
      //this.getPayCourseList();
      wx.stopPullDownRefresh()
    },
    

    /**
    * 获取联系人信息
    * **/
    getContactInfo:function(){
      var that = this;
      var token = wx.getStorageSync('wxToken')
      console.log(that.data.contactId)
      if (that.data.contactId!=0){
        wx.request({
          url: getApp().data.host + '/api/EP/GetEPContactsDetails',
          data: {
            'Token': token,
            'EPContactsId': that.data.contactId,
          },
          method: 'POST',
          dataType: 'json',
          success: function (res) {
            that.setData({
              EPContactsName: res.data.Info.EPContactsName,
              IsAuth: res.data.Info.IsAuth,
              Phone: res.data.Info.Phone,
              ShowUrl: res.data.Info.ShowUrl,
              SaveUrl: res.data.Info.SaveUrl,
            });
          }
        })
      }
    },
      /**
       * 上传头像
       * **/
    uploadImg:function(){
      var that=this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // å返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          wx.uploadFile({
            url: getApp().data.host + '/api/EP/UploadImg', 
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
            },
            success: function (res) {
              var data = JSON.parse(res.data);
              that.setData({
                ShowUrl: data.Info.ShowUrl,
                SaveUrl: data.Info.SaveUrl,
              });
            }
          })
        }
      })
    },

    /**
    * 保存联系人
    * **/
    savaContract:function(e){
      var that=this;
      var token = wx.getStorageSync('wxToken')
      wx.request({
        url: getApp().data.host + '/api/EP/SaveEPContacts',
        data: {
          'Token': token,
          'ContactsName': e.detail.value.ContactsName,
          'HeadImg': that.data.SaveUrl,
          'Phone': '18363974853',          
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          wx.navigateTo({
            url: "/page/contacts-list/index"
          })
        }
      })
    }
})
