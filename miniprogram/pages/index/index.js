// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrls: [{
        url: 'http://fdfs.xmcdn.com/group70/M07/C8/3F/wKgO2F4NtbPjar-NAAG6Bzqt_Ic667.jpg',
      },
      {
        url: 'http://fdfs.xmcdn.com/group72/M02/87/C3/wKgO0F4NtRDgev1YAAGEx1qy1Vs507.jpg',
      },
      {
        url: 'http://fdfs.xmcdn.com/group72/M01/87/F0/wKgO0F4NtrHgLjpMAAGmCSkT8o0701.jpg',
      },
      {
        url: 'http://fdfs.xmcdn.com/group68/M0B/E8/3B/wKgMeF3FYITCmbz6AAGT70SHlfo381.jpg',
      }
    ],
    playlist: [],
    index: 0
  },


  swiper: function(e) {
    var index = e.detail.current
    console.log(index)
    this.setData({
      index: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})