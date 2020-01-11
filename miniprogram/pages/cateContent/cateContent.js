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
      ctoView: '',
      isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  avtiveClick(e){

    if (e.currentTarget.dataset.text ==='quanbu'){
      this.setData({
        textCode: e.currentTarget.dataset.text
      })
      wx.request({
        url: 'https://www.chenxuejing.xyz/main/m-revision/page/category/queryCategoryPage', //仅为示例，并非真实的接口地址
        data: {
          categoryCode: this.data.itemCode,
          pageSize: 30,
          sort: 0,
        },
        success: (res) => {
          this.setData({
            menuList: [
              { code: 'quanbu', metaDataValue: '全部' },
              ...res.data.data.subCategories
            ],
            listView: res.data.data.firstPageCategoryAlbums.albumBriefDetailInfos,
          })
        }
      })
    }else{
      this.setData({
        textCode: e.currentTarget.dataset.text,
        ctoView: this.data.textCode
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
          this.setData({
            menuList: [
              { code: 'quanbu', metaDataValue: '全部' },
              ...res.data.data.subCategories
            ],
            listView: res.data.data.firstPageCategoryAlbums.albumBriefDetailInfos,
          })
        }
      })
    }
    

  },
  //二级菜单
  submenuClick(){
    this.setData({
      isShow: !this.data.isShow
    })
  },
  onLoad: function (options) {
    if(options.allCode){
      this.setData({
        itemCode: options.allCode,
        textCode: 'quanbu',
      })
      wx.request({
        url: 'https://www.chenxuejing.xyz/main/m-revision/page/category/queryCategoryPage', //仅为示例，并非真实的接口地址
        data: {
          categoryCode: this.data.itemCode,
          pageSize: 30,
          sort: 0,
        },
        success: (res) => {
          console.log(res)
          this.setData({
            menuList: [
              { code: 'quanbu', metaDataValue:'全部'},
              ...res.data.data.subCategories
            ],
            listView: res.data.data.firstPageCategoryAlbums.albumBriefDetailInfos,
          })
        }
      })
    }else{
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
        success: (res) => {
          this.setData({
            menuList: [
              { code: 'quanbu', metaDataValue: '全部' },
              ...res.data.data.subCategories
            ],
            listView: res.data.data.firstPageCategoryAlbums.albumBriefDetailInfos,
          })
        }
      })
    }
    

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