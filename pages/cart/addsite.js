// pages/cart/addsite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[
      { name: '手机号码:', 'pls': '11位手机号码', val: '' },
      { name: '选择地区:', 'pls': '请填写省、市、区或县', val: '' },
      { name: '详细地址:', 'pls': '街道们牌信息', val: '' },
      { name: '邮政编码:', 'pls': '编码', val: '' }
    ]
  },
  addSite: function(e){
    if(this.data.name){
      wx.setStorage({
        key: "site",
        data: this.data.name 
      })
      wx.navigateTo({
        url: './purchase'
      })
    }
  },

  blur: function(e){
    if(e.detail.value){
      this.setData({
        name: e.detail.value
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})