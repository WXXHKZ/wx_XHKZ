// pages/detailplay/detailplay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentdata: '',
    morerepalce: [],
    totalComment: '',
    page: 0,
    albumInfoId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    this.setData({
      albumInfoId: this.options.albumInfoId
    })
    console.log(this.options.anchorInfoId, this.options.albumInfoId)
    wx.request({
      url: `https://www.ximalaya.com/revision/comment/queryComments?trackId=${this.options.albumInfoId}&page=1&pageSize=20`,
      method: 'get',
      success: (res) => {
        this.setData({
          commentdata: res.data.data.comments,
          totalComment: res.data.data.totalComment
        })
      }
    })
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

  },

  


})