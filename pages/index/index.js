//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    date:'',
    image_url:'',
    image_author:'',
    word:'',
    word_from:''
  },
  //页面初次渲染完成
  onReady: function (e) {
    var that = this;
    wx.request({
      url: 'https://api.hibai.cn/api/index/index', 
      data: {
        "TransCode": "030111", 
        "OpenId": "Test"  
      },
      method: 'post',
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        console.log(res.data) 
        that.setData({
          date: res.data.Body.date,
          image_url: res.data.Body.img_url,
          image_author: res.data.Body.img_author,
          word: res.data.Body.word,
          word_from: res.data.Body.word_from.concat('<--')
        })
      }
    })
  }
})
