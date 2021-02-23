// pages/cart/cart.js
Page({
  data: {

  },
  ja: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.data[index].sum++;
    this.setData({
      data: this.data.data
    })
    wx.setStorage({
      key: 'data',
      data: this.data.data
    })
    this.price()
  },
  jan: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.data[index].sum--;
    this.setData({
      data: this.data.data
    })
    wx.setStorage({
      key: 'data',
      data: this.data.data
    })
    this.price()
  },
  // 删除
  remove: function (e) {
    var i = e.currentTarget.dataset.inde;
    this.data.data.splice(i, 1);
    this.setData({
      data: this.data.data
    })
    if (!this.data.data.length) {
      wx.setStorage({
        key: "data",
        data: false
      })
      this.setData({
        data: false
      })
    } else {
      wx.setStorage({
        key: "data",
        data: this.data.data
      })
    }
    this.price()
  },
  // 总价
  price: function (e) {
    var num = 0;
    wx.getStorage({
      key: 'data',
      success: (res) => {
        for (var i = 0; i < res.data.length; i++) {
          num += res.data[i].price * res.data[i].sum;
        }
        this.setData({
          price: num
        })
      }

    })
  },
  onLoad: function (options) {

  },
  submitClone: function (e) {
    var post = [];
    var data = [];
    // 组合参数
    if (!this.data.data) {
      wx.showModal({
        title: '提示',
        content: '请选择商品',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    } else {
      var id = []
      var arr = [];
      for (var i = 0; i < this.data.data.length; i++){
        for (var j = 0; j < this.data.data[i].xxid.length; j++){
          id.push(this.data.data[i].xid[j] + ':' + this.data.data[i].xxid[j])
        }
        var splic = id.splice(0,this.data.data[i].xxid.length);
        var str = String(splic);
        arr.push(str)
      }
      for (var i = 0; i < this.data.data.length; i++) {
        if (this.data.data[i].flag) {
          data.push(this.data.data[i]);
            post.push({
              "goodsId": this.data.data[i].gid,
              "number": this.data.data[i].sum,
              "logisticsType": 0
            })
        }
      }
      for(var i = 0; i < arr.length; i++){
        post[i].propertyChildIds = arr[i];
      }
      wx.setStorage({
        key: "purch",
        data: data
      })
      wx.setStorage({
        key: "post",
        data: post
      })
      wx.navigateTo({
        url: './purchase'
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getStorage({
      key: 'data',
      success: (res) => {
        this.setData({
          data: res.data
        })
        this.price()
      }
    })
  }
})