/************岗位首页页面****************/
var P = require('../../lib/wxpage')
P('index', {
    data: {
      markers: [{
        iconPath: "../../image/icon/icon_fufei.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 30,
        height: 30
      }],
      polyline: [{
        points: [{
          longitude: 113.3245211,
          latitude: 23.10229
        }, {
          longitude: 113.324520,
          latitude: 23.21229
        }],
        color: "#FF0000DD",
        width: 2,
        dottedLine: true
      }],
      controls: [{
        id: 1,
        iconPath: '../../image/icon/tnfd-red.png',
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50
        },
        clickable: true
      }]
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
        title: '新增地址'
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
     * 视野发生变化时触发
     */
    regionchange(e) {
      // 地图发生变化的时候，获取中间点，也就是用户选择的位置
      if (e.type == 'end') {
        this.getLngLat()
      }
    },
    /**
     * 点击标记点时触发
     */
    markertap(e) {
      console.log(e.markerId)
    },
  
    /**
     * 点击地图触发
     */

    getLngLat:function(e){
      var that = this;
      this.mapCtx = wx.createMapContext("map");
      this.mapCtx.getCenterLocation({
        success: function (res) {
          that.setData({
            longitude: res.longitude,
            latitude: res.latitude,
            markers: [
              {
                id: 0, 
                iconPath: "../../image/icon/icon_fufei.png",
                longitude: res.longitude, 
                latitude: res.latitude,
                width: 30, 
                height: 30
              }
            ]
          }),
          wx.openLocation({
            latitude: res.longitude,
            longitude: res.latitude,
          })
        }
      })
    },
})
