// pages/profile/profile.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skinStyle: '',
    skinSwitch: '',
    isHide: true,
    userName: '',
    userImg: '',
    isBtnHide: true,
    signInShow: false,
    signDays: "0"
  },

  // 切换登录
  changeLog: function() {
    this.setData({
      isHide: true,
      userName: '',
      isBtnHide: true,
      userImg: ''
    })
    // this.animate('.bg', [{
    //   opacity: '0.6',
    // }, {
    //   opacity: '0'
    // }], 500)
  },

  // 签到
  signInShow: function () {
    this.setData({
      signInShow: true
    })
  },
  signIn: function () {
    this.setData({
      signInShow: false
    })
    var toDay = (new Date()).getDate().toString()
    if(toDay != wx.getStorageSync('Day')) {

      var D = wx.getStorageSync('Day')
      if (parseInt(toDay) != parseInt(D) + 1) {
        // 非连续签到
        wx.setStorage({
          key: 'Fir',
          data: (1).toString()
        })
      } else {
        // 连续签到
        wx.setStorage({
          key: 'Fir',
          data: (parseInt(this.data.signDays) + 1).toString()
        })
      }

      wx.setStorageSync('Day', toDay)
      var that = this
      var signDays = wx.getStorage({
        key: 'Fir',
        success: function(res) {
          that.setData({
            signDays: res.data
          })
          wx.showToast({
            title: '签到成功！',
            icon: 'success',
            duration: 1000,
            mask: true
          })
        },
      })
    } else {
      wx.showToast({
        title: '今日已经签到',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
    }
  },

  /** 切换模式 **/
  switchChange: function (e) {
    var that = this
    /**  开启夜间模式   **/
    if(e.detail.value) {
      app.globalData.skin = "black"
      app.setSkinBlackTitle(); //设置标题栏
      app.globalData.skinSwitch = true
      app.setNightTabBar();
    } else {
    /**  开启日间模式   **/
      app.globalData.skin = "normal"
      app.setSkinNormalTitle(); //设置标题栏
      app.globalData.skinSwitch = false
      app.setSunTabBar();
    }
    that.setData({
      skinStyle: app.globalData.skin
    })

    /** 本地保存 **/
    wx.setStorage({
      key: 'skin',
      data: app.globalData.skin,
    })
    wx.setStorage({
      key: 'skinSwitch',
      data: app.globalData.skinSwitch,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavBarBg()
    this.setData({
      skinStyle: app.globalData.skin,
      skinSwitch: app.globalData.skinSwitch
    }) 
  },

  bindGetUserInfo: function(e) {
    if(e.detail.userInfo) {
      var that = this
      let user = e.detail.userInfo
      let openid = app.globalData.openid
      // 用户信息
      this.setData({
        isHide: false,
        userName: user.nickName,
        userImg: user.avatarUrl
      })
    } else {
      console.log('没登陆wx')
    }
  },

  bottomBtn: function () {
    this.setData({
      isBtnHide: false
    })
    // this.animate('.bg', [{
    //   opacity: '0',
    // }, {
    //   opacity: '0.6'
    // }], 500)
  },
  cancel: function () {
    this.setData({
      isBtnHide: true
    })
    // this.animate('.bg', [{
    //   opacity: '0.6',
    // }, {
    //   opacity: '0'
    // }], 500)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 签到天数渲染
    let signDay = wx.getStorageSync('Fir')
    this.setData({
      signDays: signDay
    })
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