/************企业登录页面****************/
/***
 * */
var P = require('../../lib/wxpage')
P('index', {
  data: {
    arrayJob:["1","2","3"],
    indexJob:0,
    arrayPay: ["1", "2", "3"],
    indexPay: 0,
    JobName:"",
    lowPay:"",
    heightPay:"",
    workTime:"",
    workContent:"",
    workRequire:"",
    workPosition:[
      {
        isChoose: false,
        cityId:'1',
        addressName:'北京朝阳区小关北里于洋职业大厦'
      },
      {
        isChoose: false,
        cityId: '2',
        addressName: '北京朝阳区小关北里于洋职业大厦'
      }
    ],
    workPhone:[
      {
        isChoose: false,
        phoneId: '1',
        addressName: '北京朝阳区小关北里于洋职业大厦'
      },
      {
        isChoose: false,
        phoneId: '2',
        addressName: '北京朝阳区小关北里于洋职业大厦'
      }
    ],
    phoneClickNum:'0',//招聘联系人点击的位置
    isReflashID:"",
    reflashWay: "",//刷新方式：0.不刷新，1.智能刷新，2.预约刷新
    isReflashOpen:false
  },


  onShow: function () {
    var EPLogin = wx.getStorageSync('EPLogin')
    if (EPLogin) {
      this.getCompanyInfo();
    }
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
      title: '发布兼职简历'
    })
     
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 获取结算方式列表
   */

  clickActionSheet:function(){
    
  },

  /**
   * 提示框岗位类别 结算方式
   */

  bindPickerChange:function(e){
    if (e.currentTarget.dataset.id == '1'){
      this.setData({
        indexJob: e.detail.value
      })
    }else{

    }
  },

  /**
   * 获取用户填写的数据
   */

  changeText:function(e){
    switch (e.currentTarget.dataset.id){
      case "1":
        this.setData({
          JobName: e.detail.value
        })
        break;
      case "2":
        this.setData({
          lowPay: e.detail.value
        })
        break;
      case "3":
        this.setData({
          heightPay: e.detail.value
        })
        break;
      case "4":
        this.setData({
          workTime: e.detail.value
        })
        break;
      case "5":
        this.setData({
          workContent: e.detail.value
        })
        break;
      case "6":
        this.setData({
          workRequire: e.detail.value
        })
        break;
      default:
        break;
    }
  },

  /**
   * 工作地点的选择
   */

  clickAddress:function(e){
    var arrInfo = this.data.workPosition;
    var index = e.currentTarget.dataset.id;
    if (arrInfo[index].isChoose){
      arrInfo[index].isChoose = false;
      this.setData({
        workPosition: arrInfo
      });
    }else{
      arrInfo[index].isChoose = true;
      this.setData({
        workPosition: arrInfo
      });
    }
  },

  /**
   * 招聘联系人的点击事件
   */

  clickPhone:function(e){
    var index = e.currentTarget.dataset.id;
    if (this.data.isReflashOpen){
      this.setData({
        phoneClickNum: index,
      })
    }
  },

  /**
   * 去预约刷新页面
   */
  goToOrderView:function(){
    wx.navigateTo({
      url: '/page/add-order-reflash/index',
    })
  },

  /**
   * 是否开启智能刷新
   */

  switch1Change:function(e){
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    this.setData({
      isReflashOpen: e.detail.value
    });
  },

  /**
   *   3  发布   2 保存  1 预览
   */

  primary:function(e){
    switch (e.currentTarget.dataset.id) {
      case "1":
        this.setData({
          JobName: e.detail.value
        })
        break;
      case "2":
        this.setData({
          lowPay: e.detail.value
        })
        break;
      case "3":
        wx.request({
          url: getApp().data.host + 'api/Job/SubmitPartJob',
          data: {
            "JobId": 0,
            "Name": "test add",
            "JobCategoryId": 1,
            "PayWayId": 1,
            "SalaryLower": 100,
            "SalaryUpper": 500,
            "WorkTime": "工作时间：单双休 ",
            "WorkContent": "工作内容，限制1000字，但是包括一些HTML转义字符 ",
            "OfficeRequire": "任职要求，限制1000字，但是包括一些HTML转义字符 ",
            "EPHiringManagerId": 1,
            "RefreshWay": 2,
            "RefreshId": 1,
            "AddressList": [1, 2]
          },
          method: 'POST',
          dataType: 'json',
          success: function (res) {
            if (res.data.Msg) {
             
            }
          }
        })
        break;
      default:
        break;
    }
  }
})
