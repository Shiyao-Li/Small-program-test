//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    //加载状态
    loadingHidden: false,
    height: '',
    //纬度
    latitude: '',
    //经度
    longitude: '',
    //当前城市
    city: '',
    //pm 2.5
    pm: '',
    //当前时间
    date: '',
    //天气数据共四天，今天和之后三天的)
    weather_data: ''
  },
  onShow: function () {
    console.log('onShow')
    var that = this
    //100%好像不好使 可以获取设备高度
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.data.height = res.windowHeight;
      }
    })
    wx.getLocation({
      type: 'wgs84', //返回经纬度
      success: function (res) {
        console.log(res)
        that.data.latitude = res.latitude
        that.data.longitude = res.longitude
        //通过经纬度请求数据
        wx.request({
          //百度天气的api
          url: 'http://api.map.baidu.com/telematics/v3/weather',
          data: {
            //位置
            'location': that.data.longitude + ',' + that.data.latitude,
            //自己的百度ak
            'ak':'8WAgY0f8uRm0kpDrqGptUPYXCqaibBUs',
            //结果输出方式
            'output':'json'
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              loadingHidden: true,
              date: res.data.date,
              city: res.data.results[0].currentCity,
              pm: res.data.results[0].pm25,
              weather_data: res.data.results[0].weather_data
            })
            wx.setNavigationBarTitle({
              title: that.data.date
            })
          },
          fail: function (res){
            console.log(res.data)
          }
        })

      }
    })

  }
})
