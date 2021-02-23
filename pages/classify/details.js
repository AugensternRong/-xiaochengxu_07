// pages/classify/details.js
Page({
  data:{
    flag: true
  },
  go: function(e){
    wx.navigateTo({
      //目的页面地址
      url: 'detail?id=' + e.currentTarget.dataset.id
    })
  },
  onLoad: function (options) {
      var list = [];
      wx.request({
        url: 'https://api.it120.cc/small4/shop/goods/list',
        success: (res) => {
          for(var i = 0; i < res.data.data.length; i++){
            if (res.data.data[i].categoryId == options.id){
              list.push(res.data.data[i]);
              this.setData({
                flag: false
              })
            }
          }
          this.setData({
            detailslist: list
          })
        }
      })
    },
  onPullDownRefresh: function () {
    console.log(1)
  }
  })