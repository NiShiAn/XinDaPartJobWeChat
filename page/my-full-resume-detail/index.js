/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
        dataArr: ['托管老师', '小崔秘书', '小崔暖床', '小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊小崔暖阁暖暖暖啊', '小崔公司财务总监'],
        imgHead: ''
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
            title: '兼职简历编辑'
        })
        wx.showShareMenu({
            withShareTicket: true
        })
    },

    getPhotoImage: function () {
        console.log('asd');
        var that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                console.log(">>>>>>>>>>>>" + tempFilePaths);
                that.setData({
                    imgHead: tempFilePaths
                });
            }
        })
    },

    //跳转相关添加信息页面
    /**
     * 1:添加基本信息 
     * 2:添加求职信息
     * 3:添加教育信息
     * 4:添加语言能力
     * 5:添加证书或者荣誉
     * 6:添加实践经验或工作经历
     */
    goAddView: function (e) {
      switch (e.currentTarget.dataset.id) {
        case '1':
          wx.navigateTo({
            url: '/page/add-base-info/index',
          })
          break;
        case '2':
          wx.navigateTo({
            url: '/page/add-work-exprice/index',
          })
          break;
        case '3':
          wx.navigateTo({
            url: '/page/add-school-info/index',
          })
          break;
        case '4':
          wx.navigateTo({
            url: '/page/add-language/index',
          })
          break;
        case '5':
          wx.navigateTo({
            url: '/page/add-honor/index',
          })
          break;
        case '6':
          wx.navigateTo({
            url: '/page/add-full-work-info/index',
          })
          break;
        default:
          break;
      }
    },

    //跳转相关编辑信息页面
    /**
     * 1:编辑基本信息
     * 2:编辑求职信息
     * 3:编辑教育信息
     * 4:编辑语言能力
     * 5:编辑证书或者荣誉
     * 6:编辑实践经验或工作经历
     */
    goAddEditeView: function (e) {
      switch (e.currentTarget.dataset.id) {
        case '1':
          wx.navigateTo({
            url: '/page/add-base-info/index',
          })
          break;
        case '2':
          wx.navigateTo({
            url: '/page/add-work-exprice/index',
          })
          break;
        case '3':
          wx.navigateTo({
            url: '/page/add-school-info/index',
          })
          break;
        case '4':
          wx.navigateTo({
            url: '/page/add-language/index',
          })
          break;
        case '5':
          wx.navigateTo({
            url: '/page/add-honor/index',
          })
          break;
        case '6':
          wx.navigateTo({
            url: '/page/add-full-work-info/index',
          })
          break;
        default:
          break;
      }
    }
});
