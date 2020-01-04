// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     listdata:[],
     historydata:["德云社"],
     value:'',
     searchdata:[]
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
    wx.request({
      url: 'https://search.ximalaya.com/hotWordBillboard/list/2.0?categoryId=-1&size=8',
      method: 'get',
      success:(res)=>{
        this.setData({
          listdata: res.data.hotWordResultList
        })
      }
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

  },

  handledelate:function(){
    this.setData({
      historydata: ''
    })
  },

  handleinput:function(e){
    this.setData({
      value: e.detail.value
    })
  },

  handleclear:function(e){
    this.setData({
      value:''
    })
  },

  handlesearch:function(e){
      wx.request({
        url: `https://m.ximalaya.com/m-revision/page/search?kw=${this.data.value}&core=all&page=1&rows=20`, 
        method: 'get',
        success: (res) => {
          this.setData({
            searchdata: res.data.data.albumViews.albums
          })
          console.log(this.data.searchdata)
        }
      })
    let sign=false
    for (let i = 0; i < this.data.historydata.length;i++){
      if (this.data.value === this.data.historydata[i]){
        sign = true
      }
    }
    if (!sign){
      this.setData({
        historydata: this.data.historydata.concat(this.data.value)
      })
    }
    
  },
//搜索页面主播模块
  //https://m.ximalaya.com/m-revision/page/search?kw=${this.data.value}&core=user&page=1&rows=20&condition=voice
//搜索页面声音模块
  //https://m.ximalaya.com/m-revision/page/search?kw=${this.data.value}&core=track&page=1&rows=20

  handletosearch:function(e){
    this.setData({
      value: e.currentTarget.dataset.content
    })
  }
})