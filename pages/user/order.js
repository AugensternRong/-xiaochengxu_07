// pages/user/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: ['待支付', '代发货', '待收货', '待评价', '已完成'],
    inde: 0
  },
  // 点击切换active 下标
  inde: function (e) {
    this.setData({
      inde: e.currentTarget.dataset.inde
    })
    this.dataflier(this.data.arr);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 取消订单
  cancel: function (e) {
    var ding = e.currentTarget.dataset.ding;
    wx.request({
      url: 'https://api.it120.cc/small4/order/close',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        token: '7164c997-0dfe-43fb-af54-21ba3c7886a1',
        orderId: ding
      },
      success: (res) => {
        if (res.data.code == 0) {
          wx.showToast({
            title: '取消成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          this.http();
        }

      }
    })
  },
  // 请求订单数据
  http: function (e) {
    wx.request({
      url: 'https://api.it120.cc/small4/order/list',
      data: {
        token: '7164c997-0dfe-43fb-af54-21ba3c7886a1'
      },
      success: (res) => {
        if (res.data.data){
          console.log(res.data )
          this.setData({
            arr: res.data.data.orderList
          })
          this.dataflier(res.data.data.orderList);
          
        }
      }
    })
  },
  // 过滤数据
  dataflier: function (dataArr) {
    if (!dataArr) {
    } else {
      var data = []
      for (var i = 0; i < dataArr.length; i++) {
        if (dataArr[i].statusStr == this.data.title[this.data.inde]) {
          data.push(dataArr[i])
        }
      }
      this.setData({
        data: data
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.http();
  }
})