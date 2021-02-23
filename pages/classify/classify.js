var app = getApp();
Page({
  data: {
    allList:['所有分类','配件装饰','居家生活','新品服装'],
    num: 0,
    movies: [
      { url: "http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg" },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' }
    ]
  },
  active: function(e) {
    var list = [];
    this.setData({
      num: e.currentTarget.dataset.index
    })
    if(e.currentTarget.dataset.index == 0){
      wx.showLoading({
        title: '正在加载',
      })
      wx.request({
        url: 'https://api.it120.cc/small4/shop/goods/category/all',
        success: (res) => {
          this.setData({
            list: res.data.data
          })
          wx.hideLoading()
        }
      })
    } else {
      if (e.currentTarget.dataset.index == 1){
        wx.showLoading({
          title: '正在加载',
        })
        wx.request({
          url: 'https://api.it120.cc/small4/shop/goods/category/all',
          success: (res) => {
            for (let i = 0; i < res.data.data.length; i++){
              if (res.data.data[i].name == '配件装饰' || res.data.data[i].name == "钱包及小皮件"){
                list.push(res.data.data[i])
              }
            }
            this.setData({
              list: list
            })
            wx.hideLoading()
          }
        })
      } else if (e.currentTarget.dataset.index == 2){
        wx.showLoading({
          title: '正在加载',
        })
        wx.request({
          url: 'https://api.it120.cc/small4/shop/goods/category/all',
          success: (res) => {
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].name == "居家" || res.data.data[i].name == "床品件套" || res.data.data[i].name == "家具" || res.data.data[i].name == "行李箱" || res.data.data[i].name == "电器" || res.data.data[i].name == "生活电器") {
                list.push(res.data.data[i])
              }
            }
            this.setData({
              list: list
            })
            wx.hideLoading()
          }
        })
      } else if (e.currentTarget.dataset.index == 3) {
        wx.showLoading({
          title: '正在加载',
        })
        wx.request({
          url: 'https://api.it120.cc/small4/shop/goods/category/all',
          success: (res) => {
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].name == "服装" || res.data.data[i].name == "衬衫" || res.data.data[i].name == "T恤" || res.data.data[i].name == "牛仔" ) {
                list.push(res.data.data[i])
              }
            }
            this.setData({
              list: list
            })
            wx.hideLoading()
          }
        })
      }
      
      
    } 
    
  },
  details: function(e){
    wx.navigateTo({
      //目的页面地址
      url: 'details?id=' + e.currentTarget.dataset.id,
      
    })
   
   
  },
  onLoad: function (options) {
    wx.request({
      url: 'https://api.it120.cc/small4/shop/goods/category/all',
      success: (res) => {
        this.setData({
          list: res.data.data
        })
      }
    })
  }
})