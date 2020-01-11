// miniprogram/pages/cateContent/cateConetnt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      itemCode:"",
      textCode:'',
      menuList: null,
      listView: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  avtiveClick(e){
    this.setData({
      textCode: e.currentTarget.dataset.text
    })
    wx.request({
      url: 'https://www.chenxuejing.xyz/main/m-revision/page/category/queryCategoryPage', //仅为示例，并非真实的接口地址
      data: {
        categoryCode: this.data.itemCode,
        subCategoryCode: this.data.textCode,
        pageSize: 30,
        sort: 0,
      },
      success: (res) => {
        console.log(res.data)
        console.log(res.data.data.subCategories, res.data.data.firstPageCategoryAlbums.albumBriefDetailInfos)
        this.setData({
          menuList: res.data.data.subCategories,
          listView: res.data.data.firstPageCategoryAlbums.albumBriefDetailInfos,
        })
      }
    })
  },
  allClick(e){
    wx.request({
      url: 'https://www.chenxuejing.xyz/main/m-revision/page/category/queryCategoryPage', //仅为示例，并非真实的接口地址
      data: {
        categoryCode: this.data.itemCode,
        pageSize: 30,
        sort: 0,
      },
      success: (res) => {
        console.log(res.data)
        console.log(res.data.data.subCategories, res.data.data.firstPageCategoryAlbums.albumBriefDetailInfos)
        this.setData({
          menuList: res.data.data.subCategories,
          listView: res.data.data.firstPageCategoryAlbums.albumBriefDetailInfos,
        })
      }
    })
  },
  onLoad: function (options) {
      this.setData({
        itemCode: options.itemCode,
        textCode: options.textCode,
      })
        
    wx.request({
      url: 'https://www.chenxuejing.xyz/main/m-revision/page/category/queryCategoryPage', //仅为示例，并非真实的接口地址
      data: {
        categoryCode: this.data.itemCode,
        subCategoryCode: this.data.textCode,
        pageSize: 30,
        sort: 0,
      },
      success:(res)=> {
        console.log(res.data)
        console.log(res.data.data.subCategories, res.data.data.firstPageCategoryAlbums.albumBriefDetailInfos)
        this.setData({
          menuList: res.data.data.subCategories,
          listView: res.data.data.firstPageCategoryAlbums.albumBriefDetailInfos,
        })
      }
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