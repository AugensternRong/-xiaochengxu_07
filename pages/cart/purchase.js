// pages/cart/purchase.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 当点击确认下单的时后   提交订单
  submitS: function(e){
    var post = JSON.stringify(this.data.post);
    wx.request({
      url: 'https://api.it120.cc/small4/order/create',
      method: 'POST',
      data: {
        token: '7164c997-0dfe-43fb-af54-21ba3c7886a1',
        goodsJsonStr: post
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.data){
          wx.setStorage({
            key: "data",
            data: false
          })
          wx.navigateTo({
            url: '../../pages/user/order'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: "site",
      success:  (res)=> { 
        this.setData({
          title: res.data
        })
      },
      fail: function (res) { 
        wx.showModal({
          title: '提示',
          content: '请添加地址',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: './addsite'
              })
            } else if (res.cancel) {
              console.log(1)
              wx.redirectTo({
                url: './cart'
              })
            }
          }
        })  
      }
    })
    // 获取当前为true的数据准备下单
    wx.getStorage({
      key: 'purch',
      success: (res) => {
        // 获取当前为true的数据的总价
        var num = 0;
        for(var i = 0; i < res.data.length; i++){
          num += res.data[i].sum * res.data[i].price
        }
        this.setData({
          data: res.data,
          price: num
        })
      }
    })
    wx.getStorage({
      key: 'post',
      success: (res) => {
        this.setData({
          post: res.data
        })
      }
    }) 
  },
})