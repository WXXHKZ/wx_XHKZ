// pages/profile/profile.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skinStyle: '',
    skinSwitch: ''
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
    console.log(app.globalData.skin)
    this.setData({
      skinStyle: app.globalData.skin,
      skinSwitch: app.globalData.skinSwitch
    }) 
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