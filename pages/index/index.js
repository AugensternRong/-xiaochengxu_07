var app = getApp()
Page({
  data: {
    markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    movies: [
      { url: "http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg" },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
    icon: [{ type: 'success', text: "签到" }, { type: 'success',text:'礼券' }, { type: 'success',text:'砍价' },{type:'success',text:'专栏'}],
    content: [
      { name: '瑞典的神器面包椅', price: '849起', expression: '新品', src:'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=64911bf659fbb2fb2b2b5e127f4b2043/a044ad345982b2b7eddd2a6f3dadcbef77099bde.jpg'},
      { name: '瑞典的神器面包椅', price: '849起',  src: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=64911bf659fbb2fb2b2b5e127f4b2043/a044ad345982b2b7eddd2a6f3dadcbef77099bde.jpg' },
      { name: '瑞典的神器面包椅', price: '849起', src: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=64911bf659fbb2fb2b2b5e127f4b2043/a044ad345982b2b7eddd2a6f3dadcbef77099bde.jpg' },
      { name: '瑞典的神器面包椅', price: '849起', expression: '缺货', src: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=64911bf659fbb2fb2b2b5e127f4b2043/a044ad345982b2b7eddd2a6f3dadcbef77099bde.jpg' }
      ],
      container:[
        { src: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=64911bf659fbb2fb2b2b5e127f4b2043/a044ad345982b2b7eddd2a6f3dadcbef77099bde.jpg', name: '方形封闭式宠物窝', pricenew: '￥99', price: '￥155', num: '50', introduce: '封闭式设计猫咪独享'},
        { src: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=64911bf659fbb2fb2b2b5e127f4b2043/a044ad345982b2b7eddd2a6f3dadcbef77099bde.jpg', name: '方形封闭式宠物窝', pricenew: '￥99', price: '￥155', num: '50', introduce: '封闭式设计猫咪独享'},
        { src: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=64911bf659fbb2fb2b2b5e127f4b2043/a044ad345982b2b7eddd2a6f3dadcbef77099bde.jpg', name: '方形封闭式宠物窝', pricenew: '￥99', price: '￥155', num: '50', introduce: '封闭式设计猫咪独享'}
      ],
      movies2: [
        { url: "http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg",name:'别叫外卖了来喝完鸡汤' },
        { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg', name: '别叫外卖了来喝完鸡汤'},
        { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg', name: '别叫外卖了来喝完鸡汤'},
        { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg', name: '别叫外卖了来喝完鸡汤'}
      ],
      lastIndex: [
        { url: "http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg",name: '世纪蒙城四件套',jieshao: "狗年定制款",price: '￥395' },
        { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg', name: '世纪蒙城四件套', jieshao: "狗年定制款", price: '￥395' },
        { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg', name: '世纪蒙城四件套', jieshao: "狗年定制款", price: '￥395' },
        { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg', name: '世纪蒙城四件套', jieshao: "狗年定制款", price: '￥395'}
      ]
  },
  onLoad: function () {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }

})