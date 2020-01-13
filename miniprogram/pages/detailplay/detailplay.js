// pages/detailplay/detailplay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maindata: '',
    commentdata: '',
    morerepalce: [],
    totalComment: '',
    page: 0,
    albumInfoId: '',
    playsign: false,
    num: 0,
    max: '',
    nowtime: '0:00',
    alltime: '0:00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(options) {
    this.setData({
      albumInfoId: this.options.albumInfoId
    })
    wx.request({
      url: `https://www.chenxuejing.xyz/main/m-revision/page/track/queryTrackPage/${this.data.albumInfoId}`,
      method: 'get',
      success: (res) => {
        this.setData({
          maindata: res.data.data
        })
      }
    })

    wx.request({
      url: `https://www.chenxuejing.xyz/main/revision/comment/queryComments?trackId=${this.options.albumInfoId}&page=1&pageSize=20`,
      method: 'get',
      success: (res) => {
        this.setData({
          commentdata: res.data.data.comments,
          totalComment: res.data.data.totalComment
        })
      }
    })

    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.play()
    this.setData({
      playsign: true
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

  audioPlay: function() {
    this.audioCtx.play()
    this.setData({
      playsign: true
    })
  },


  audioPause: function() {
    this.audioCtx.pause()
    this.setData({
      playsign: false
    })
  },

  
  audio14: function(e) {
    this.setData({
      num: e.detail.value
    })
    this.audioCtx.seek(this.data.num)
  },

  bindtimeupdate: function(res) {
    this.setData({
      max: parseInt(res.detail.duration),
      nowtime: this._tranTime(parseInt(res.detail.currentTime)),
      alltime: this._tranTime(parseInt(res.detail.duration)),
      num: parseInt(res.detail.currentTime)
    })
  },

  _tranTime(num) {
    let minute = parseInt(num / 60);
    let second = num % 60;
    let time = ''
    if (second < 10) {
      time = minute + ":0" + second
    } else {
      time = minute + ":" + second
    }

    return time
  },

  handleback: function(e) {
    wx.navigateBack({
      delta: 1
    })
  },
})