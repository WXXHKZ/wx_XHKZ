// pages/blog-edit/blog-edit.js
// 输入文字的最大数量限制
const MAX_WORDS_NUM = 150
// 最大上传图片数量
const MAX_IMG_NUM = 9
const db = wx.cloud.database()
// 输入的文字内容
let content = ''

let timer; // 防抖处理
let userInfo = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入的文字个数
    wordsNum: 0,
    // footer距离底部距离
    footerBottom: 0,
    // 已经选择的图片
    images: [],
    selectphoto: true // 添加图片的元素是否显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    userInfo = options
  },

  onInput(event) {
    console.log(event.detail.value)
    let wordsNum = event.detail.value.length
    if (wordsNum >= MAX_WORDS_NUM) {
      wordsNum = `最大字数为${MAX_WORDS_NUM}`
    }
    this.setData({
      wordsNum
    })
    content = event.detail.value
  },

  onFocus(event) {
    console.log(event)
    this.setData({
      footerBottom: event.detail.height
    })
  },

  onBlur() {
    this.setData({
      footerBottom: 0
    })
  },

  onChooseImage() {
    // 还能在选几张图片
    let max = MAX_IMG_NUM - this.data.images.length
    // console.log(max)
    wx.chooseImage({
      count: max,
      sizeType: ['oruginal', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res)
        this.setData({
          images: [...this.data.images, ...res.tempFilePaths]
        })
        max = MAX_IMG_NUM - this.data.images.length
        this.setData({
          selectphoto: max <= 0 ? false : true
        })
      },
    })
  },

  onDelImage(event) {
    this.data.images.splice(event.target.dataset.index, 1)
    this.setData({
      images: this.data.images
    })
    if (this.data.images.length === (MAX_IMG_NUM - 1)) {
      this.setData({
        selectphoto: true
      })
    }
  },
  onPreviewImage(event) {
    wx.previewImage({
      urls: this.data.images,
      current: event.target.dataset.imgsrc
    })
  },

  send() {
    // 2. 数据 -> 云数据库
    // 数据库: 内容、图片、用户唯一标识openid、昵称、头像、发布时间
    // 1. 图片 -> 云存储 会返回fileID 云文件ID
    // 用户发布的博客文字内容不能为空
    if (content.trim() === '') {
      wx.showModal({
        title: '请输入内容',
        content: ''
      })
      return
    }

    wx.showLoading({
      title: '发布中',
      mask: true
    })

    let PromiseArr = []
    let fileIds = []

    this.data.images.forEach((item) => {
      let p = new Promise((resolve, reject) => {
        // 文件扩展名
        let suffix = /\.\w+$/.exec(item)[0]

        // 图片上传 wx.cloud.uploadFile每次只能上传一张,所以需要循环
        wx.cloud.uploadFile({
          cloudPath: 'blog/' + Date.now() + '-' + Math.random() * 1000000 + suffix, // 上传到云端的路径
          filePath: item, // 当前文件的临时路径
          success: (res) => {
            console.log(res.fileID)
            fileIds.push(res.fileID)
            resolve()
          },
          fail: (err) => {
            console.log(err)
            reject()
          }
        })

      })

      PromiseArr.push(p)
    })

    // 存入到云数据库
    Promise.all(PromiseArr).then((res) => {
      // 在小程序段操作云数据库插入数据自带openid,所以不需要写
      db.collection('blog').add({
        data: {
          ...userInfo,
          content,
          img: fileIds,
          createTime: db.serverDate() // 服务端的时间,因为客户端的时间可能不准确
        }
      }).then((res) => {
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        })

        // 返回blog页面并且刷新
        wx.navigateBack()

        // 调用上一个页面的方法
        const pages = getCurrentPages()
        const prevPage = pages[pages.length - 2]
        prevPage.onPullDownRefresh()


      })
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: '发布失败',
      })
      console.log(err)
    })
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