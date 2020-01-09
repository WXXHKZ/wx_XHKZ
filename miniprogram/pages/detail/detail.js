// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maindata: '',
    anchordata: '',
    playCount: '',
    subscribeCount: '',
    playlistdata: '',
    page: 1
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
    wx.request({
      url: `https://m.ximalaya.com/m-revision/page/album/v2/queryAlbumPage/${this.options.albumInfoId}?albumCounts=track`,
      method: 'get',
      success: (res) => {
        this.setData({
          maindata: res.data.data,
          playCount: this._tranNumber(res.data.data.albumDetailInfo.statCountInfo.playCount, 2),
          subscribeCount: this._tranNumber(res.data.data.albumDetailInfo.statCountInfo.subscribeCount, 2),
        })
      }
    })
    wx.request({
      url: `https://m.ximalaya.com/m-revision/common/user/queryUserInfo/${this.options.anchorInfoId}?userCountKeys=follower`,
      method: 'get',
      success: (res) => {
        this.setData({
          anchordata: res.data.data
        })
      }
    })
    wx.request({
      url: `https://m.ximalaya.com/m-revision/common/album/queryAlbumTrackRecordsByPage?albumId=${this.options.albumInfoId}&page=1&pageSize=20&asc=true&countKeys=play%2Ccomment`,
      method: 'get',
      success: (res) => {
        let CategoryList = res.data.data.trackDetailInfos
        CategoryList.map((item) => {
          let count = item.statCountInfo.playCount
          let time = item.trackInfo.duration
          item.statCountInfo.playCount = this._tranNumber(count, 2)
          item.trackInfo.duration = this._tranTime(time)
        })
        this.setData({
          playlistdata: res.data.data.trackDetailInfos
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

  _tranNumber(num, point) {
    let numStr = num.toString().split('.')[0]
    if (numStr.length < 6) {
      return numStr
    } else if (numStr.length >= 6 && numStr.length <= 8) {
      let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
      return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
    } else if (numStr.length > 8) {
      let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
      return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
    }
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

  handlescrollbottom: function() {
    this.setData({
      page: this.data.page + 1
    })
    wx.request({
      url: `https://m.ximalaya.com/m-revision/common/album/queryAlbumTrackRecordsByPage?albumId=${this.options.albumInfoId}&page=${this.data.page}&pageSize=20&asc=true&countKeys=play%2Ccomment`,
      method: 'get',
      success: (res) => {
        let CategoryList = res.data.data.trackDetailInfos
        CategoryList.map((item) => {
          let count = item.statCountInfo.playCount
          let time = item.trackInfo.duration
          item.statCountInfo.playCount = this._tranNumber(count, 2)
          item.trackInfo.duration = this._tranTime(time)
        })
        this.setData({
          playlistdata: this.data.playlistdata.concat(res.data.data.trackDetailInfos)
        })
      }
    })
  },

  handleback: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },

  handletoplay: function(e) {
    wx.navigateTo({
      url: `/pages/detailplay/detailplay?albumInfoId=${e.currentTarget.dataset.albuminfoid}&anchorInfoId=${e.currentTarget.dataset.anchorinfoid}`,
    })
  }


})