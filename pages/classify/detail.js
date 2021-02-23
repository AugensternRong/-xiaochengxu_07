// pages/classify/detail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: false,
    i: 0,
    num: 1,
    flag: false,
    xxid: [],
    xid: [],
    data: "false"
  },
  top: function(e){
    this.setData({
      i: e.currentTarget.dataset.i
    })
  },
  flag:function(e){
    this.setData({
      flag: !this.data.flag
    })
  },
  go:function(e){
    wx.switchTab({
      url: '../../pages/cart/cart'
    })
  },
  // 减函数
  jian: function(e){
    if(this.data.num == 1 || this.data.num <= 1){
      wx.showModal({
        title: '提示',
        content: '最少购买数量了',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })  
      
    }else{
      this.setData({
        num: --this.data.num
      })
    }
   
  },
  // 加
  ja:function(e){
    this.setData({
      num: ++this.data.num
    })
  },
  // 加入购物车
  add:function(e){
    var sp = 0;
    var xName = [];
    var dName = [];
    for (var i = 0; i < this.data.obj.properties.length; i++){
      dName.push(this.data.obj.properties[i].name);
      for (var j = 0; j < this.data.obj.properties[i].childsCurGoods.length; j++) {
        if (this.data.obj.properties[i].childsCurGoods[j].flag){
          xName.push(this.data.obj.properties[i].childsCurGoods[j].name);
          sp++;
        }
      }
    }
    // 加入购物车
    if (sp == this.data.obj.properties.length){
       wx.showToast({
        title: '成功',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
      // 数量加到一起
       this.data.sum = this.data.num;
       this.setData({
         sum: this.data.sum
       })
      //  价钱
       var price = e.currentTarget.dataset.price;
      // 设置数据
       var data = {
         sum: this.data.sum,
         name: e.currentTarget.dataset.name,
         url: e.currentTarget.dataset.img,
         price: price,
         xname: xName,
         dname: dName,
         flag: true,
         gid: e.currentTarget.dataset.gid,
         xid: this.data.xid,
         xxid: this.data.xxid
       }
       //设置本地存储
       
       wx.getStorage({
         key: 'data',
         success: (res) => {
           if(res.data == false){
             wx.setStorage({
               key: 'data',
               data: [data]
             })
           }else{
             var w = res.data;
             var inde = false;
             var flag = false;
             for(var i = 0; i < w.length; i++){
               if (w[i].name == data.name && w[i].xname[0] == data.xname[0]){
                 if (!data.xname[1] || w[i].xname[1] == data.xname[1] ){
                   inde = i;
                   flag = i + 1;
                   break;
                 }
               }
             }
             if ( flag ){
               var sum = w[inde].sum + data.sum;
               w[inde].sum = sum;
               wx.setStorage({
                 key: 'data',
                 data: w
               })
             }else{
               w.push(data);
               wx.setStorage({
                 key: 'data',
                 data: w
               })
               inde = false;
               flag = false;
             }
             var num = 0;
             for (var i = 0; i < res.data.length; i++) {
               num += res.data[i].sum;
             }
             this.setData({
               sum: num
             })
           }
         }
       })
      //  点击显示 
       this.setData({
         flag: !this.data.flag
       })
    }else{
      
      wx.showModal({
        title: '提示',
        content: '请选这规格',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })  
    }
  },
  // 选择规格
  inde:function(e){
    var ix = e.currentTarget.dataset.index;
    var xi = e.currentTarget.dataset.xi;
    var did = e.currentTarget.dataset.did;
    this.data.xxid[ix] = e.currentTarget.dataset.xid;
    this.data.xid[ix] = e.currentTarget.dataset.xxid;
    for (var j = 0; j < this.data.obj.properties[ix].childsCurGoods.length; j++){
      this.data.obj.properties[ix].childsCurGoods[j].flag = false;
    }
    this.data.obj.properties[ix].childsCurGoods[xi].flag = true
    this.setData({
      obj: this.data.obj
    })
    var sp = 0;
    for (var i = 0; i < this.data.obj.properties.length; i++) {
      for (var j = 0; j < this.data.obj.properties[i].childsCurGoods.length; j++) {
        if (this.data.obj.properties[i].childsCurGoods[j].flag) {
          sp++;
        }
      }
    }
    if ( sp == this.data.obj.properties.length ){
      var str = ''
      for (var i = 0; i < this.data.xid.length; i++){
        str += this.data.xid[i] + ':' + this.data.xxid[i] + ','
      }
      var length = str.length;
      var str = str.substr(0,length - 1);
        wx.request({
          url: 'https://api.it120.cc/small4/shop/goods/price',
          data: {
            goodsId: did,
            propertyChildIds: str
          },
          success: (res) => {
            this.data.obj.basicInfo.originalPrice = res.data.data.originalPrice;
            this.setData({
              data: res.data,
              obj: this.data.obj
            })
          }
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
        title: '正在加载'
      })
    var value = wx.getStorageSync('data');
    if ( value === "" ){
      wx.setStorage({
        key: 'data',
        data: false
      })
    }else{
      this.setData({
        sum: 0
      })
    }
    wx.request({
      url: 'https://api.it120.cc/small4/shop/goods/detail' ,
      data:{
        id: options.id
      },
      success: (res) => {
        this.setData({
          obj: res.data.data
        })
        var article = res.data.data.content;
        WxParse.wxParse('article', 'html', article, this, 5);
        wx.hideLoading()
      }
    })
    wx.getStorage({
      key: 'data',
      success: (res)=> {
        var num = 0;
        for(var i = 0; i < res.data.length; i++){
          num += res.data[i].sum;
        }
        this.setData({
          sum: num
        })
      }
    })
  },
 
})