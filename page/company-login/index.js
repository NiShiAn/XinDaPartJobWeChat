/************企业登录页面****************/
/***
 * 企业登录》
 * 点击获取验证码
 * */
var countdown = 60;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      is_show: true
    })
    countdown = 60;
    return;
  } else {
    that.setData({
      is_show: false,
      last_time: countdown
    })

    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }
    , 1000)
}
var P = require('../../lib/wxpage')
P('index', {
    data: {
      last_time: '',
      is_show: true,
      phone: "",
      verify:"",
      isEPLogin:false
    },


    onShow: function () {
    
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
      var EPLogin = wx.getStorageSync('EPLogin');
      var EPPhone = wx.setStorageSync('EPPhone') ? wx.setStorageSync('EPPhone'):'13658669173';
      if (EPLogin && EPPhone != ''){
        wx.setNavigationBarTitle({
          title: '企业中心'
        })
        this.setData({
          isEPLogin: true //false
        })
        var that=this;
        wx.request({
          url: getApp().data.host + 'api/Account/EPDefaultLogin',
          data: {
            "Phone": EPPhone,
            "OpenId": wx.getStorageSync('wxOpenId'),
            "City": '0532',
          },
          method: 'POST',
          dataType: 'json',
          success: function (res) {
            if (res.data.Msg) {
              console.log("*********" + JSON.stringify(res.data))
              wx.setStorageSync('CIsMainAccount', res.data.Info.IsMainAccount);
              wx.setStorageSync('wxToken', res.data.Info.Token);
              wx.setStorageSync('EPLogin', true);
              wx.setStorageSync('EPPhone', that.data.phone);
              that.setData({
                isEPLogin: true //false
              });
              that.getCompanyInfo();
            }
          }
        })
      }else{
        wx.setNavigationBarTitle({
          title: '企业登录页面'
        })
        this.setData({
          isEPLogin: false //false
        })
      }
      
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
     * 获取企业详情
     */

    getCompanyInfo: function () {
      var token = wx.getStorageSync("wxToken");
      wx.request({
        url: getApp().data.host + 'api/EP/GetEPDetailInfo',
        data: {
          "Token": token,
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          if (res.data.Msg) {
            wx.setStorageSync("", res.data.Info.CompanyId)
            // { "Msg":true, "Message":"操作成功", "ResultCode":10000, "Info":{ "CompanyId":7, "CompanyEmployerId":0, "CompanyEmployerName":"0", "CompanyName":"", "CompanyAddress":"", "CompanyFullName":"", "CompanyDesc":"", "CompanyImgList":[], "JobList":[] } }
          }
        }
      });
    },
    
    
    /**
    * 获取用户输入的用户名
    * **/
    phoneInput: function (e) {
      this.setData({
        phone: e.detail.value
      })
    },

    /**
    * 获取用户输入的验证码
    * **/
    verifyInput: function (e) {
      this.setData({
        verify: e.detail.value
      })
    },

    /**
    * 点击获取验证码
    * **/
    GetVerify: function () {
      console.log(111)
      var that = this;
      // 将获取验证码按钮隐藏60s，60s后再次显示
      if (that.data.phone == "") {
        wx.showToast({
          title: '请填写手机号~',
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.request({
        url: getApp().data.host + 'api/Account/GetPhoneCode',
        data: {
          "Phone": that.data.phone
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          if (res.data.Msg) {
            that.setData({
              is_show: (!that.data.is_show)  //false
            })
            settime(that);
          } else {
            wx.showToast({
              title: res.data.Message,
              duration: 2000
            })
          }

        }
      })
    },

    /**
    * 点击进行企业登录
    * **/
    CompanyLogin: function () {
      var that = this;
      if (that.data.phone == "") {
        wx.showToast({
          title: '请填写手机号~',
          icon: 'none',
          duration: 2000
        })
        return
      } else if (that.data.verify == "") {
        wx.showToast({
          title: '请输入验证码~',
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.request({
        url: getApp().data.host + 'api/Account/EPLogin',
        data: {
          "Phone": that.data.phone,
          "OpenId": wx.getStorageSync('wxOpenId'),
          "VerifyCode": that.data.verify,
          "City": '0532',
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          if (res.data.Msg) {
            wx.setStorageSync('CIsMainAccount', res.data.Info.IsMainAccount);
            wx.setStorageSync('wxToken', res.data.Info.Token);
            wx.setStorageSync('EPLogin', true);
            wx.setStorageSync('EPPhone', that.data.phone);
            that.setData({
              isEPLogin: true //false
            });
            this.getCompanyInfo();
          } 
        }
      })
    },
    //发布兼职按钮
    goPartJob: function () {
      wx.navigateTo({
        url: '/page/company-release-part-job/index',
      })
    },
    //发布全职按钮 
    goFullJob: function () {
      wx.navigateTo({
        url: '/page/company-release-full-job/index',
      })
    },
    //跳转智能岗位、平台推荐岗位、面试邀请记录、已投递的岗位
    goJobList: function (e) {
      if (e.currentTarget.dataset.id == '1') {
        wx.navigateTo({
          url: '/page/company-job-list/index',
        })
      } else {
        wx.navigateTo({
          url: '/page/alr-pay-resume-list/index?jobType=' + e.currentTarget.dataset.id,
        })
      }
    },
    //我的举报页面
    goReportView: function () {
      wx.navigateTo({
        url: '/page/my-report-list/index',
      })
    },
    //切换城市列表
    goChangeCity: function () {
      wx.navigateTo({
        url: '/page/change-city/index',
      })
    },
    /**
     * 跳转到企业认证 1：编辑 2：进行中 3：已认证
     */
    goCompanyAudit: function (e) {
      if (e.currentTarget.dataset.id == '1') {
        wx.navigateTo({
          url: '/page/company-audit-edite/index',
        })
      } else if (e.currentTarget.dataset.id == '2') {
        wx.navigateTo({
          url: '/page/company-audit-statues/index',
        })
      } else {
        wx.navigateTo({
          url: '/page/company-audit-finished/index',
        })
      }

    },

    /**
     * 跳转招聘联系人列表
     */
    toContactList: function () {
      wx.navigateTo({
        url: '/page/contacts-list/index',
      })
    },

    /**
     * 跳转升级会员
     */
    toBuyVip: function () {
      wx.navigateTo({
        url: '/page/buy-vip/index',
      })
    },

    /**
     * 跳转到子账号列表
     */
    toSubAccountList: function () {
      wx.navigateTo({
        url: '/page/sub-account-list/index',
      })
    },

    /**
     * 跳转到工作多地址
     */
    toAddressList: function () {
      wx.navigateTo({
        url: '/page/address-list/index',
      })
    }
})
