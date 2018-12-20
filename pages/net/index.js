// pages/net/index.js
Page({
data:{
  songs:'',//结果集合
  song:'',//搜索的信息
  num:0,
  count:0//为了分页时能躲开第一次空白的缺陷
},
//输入框赋值
binput: function(e){
  this.setData({
    song: e.detail.value
  })
},
//点击搜索后的网络请求
search: function(e){  
  count: 0 
  var that = this
  console.log(this.data.song)
  wx.request({
    url: "https://api.imjad.cn/cloudmusic/?",
    data:{
      type: 'search',
      s: this.data.song,
      limit: 10,
      offset: this.data.num
    },
    header: {
      //"Content-Type":"application/json"
    },
    success: function (res) {
      console.log(res.data.result.songs)
      if(that.data.count==0){
        that.setData({
          songs: res.data.result.songs
        })
      }else{
        that.setData({
          songs: that.data.songs.concat(res.data.result.songs)
        })
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
},
    //滚动到底部触发事件  
  searchScrollLower: function () {
    let that = this;
    that.data.count = 1;
    that.data.num = that.data.num +10;
    that.search();
    wx.showToast({
      title: '加载中。。。',
      icon: 'loading',
      duration: 1000
    })  
  }


})