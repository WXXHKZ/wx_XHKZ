// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[],
    activeBtn:'book',
    toView: 'book',
    activeIndex:0
  },
  activeClick(e){
   
    this.setData({
      activeBtn: e.currentTarget.dataset.item,
      toView: e.currentTarget.dataset.item,
      activeIndex: e.currentTarget.dataset.index
    })
  },
  scroll(e) {
    console.log(e.detail.scrollHeight)
    let clientX = (e.detail.scrollHeight-400)/this.data.menuList.length
    let index = Math.floor(e.detail.scrollTop / clientX)
    
    if(index<27){
    
     this.setData({
       activeBtn: this.data.menuList[index].category.name
     })
    }
     
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://m.ximalaya.com/m-revision/page/category/queryCategories',
      success:(res)=>{
        this.setData({
          menuList: res.data.data
        })
      }
    })
    // const query = wx.createSelectorQuery()
    // query.select('.cate-show').boundingClientRect()
    // query.selectViewport().scrollOffset()
    // query.exec(function (res) {
    //   res[0].top       // #the-id节点的上边界坐标
    //   res[1].scrollTop = 100 // 显示区域的竖直滚动位置
    // })
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