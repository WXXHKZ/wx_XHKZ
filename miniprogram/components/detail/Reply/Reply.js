// components/detail/Reply/Reply.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'replyId': Number,
    "commentdata": Object,
    "albumInfoId": Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    page:0,
    morerepalce: [],
    commentdata:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleadddata: function (e) {
      this.setData({
        page: this.data.page + 1
      })
      wx.request({
        url: `https://www.ximalaya.com/revision/comment/queryReplies?trackId=${this.properties.albumInfoId}&commentId=${e.target.dataset.id}&page=${this.data.page}&pageSize=20`,
        method: 'get',
        success: (res) => {
          this.setData({
            morerepalce: this.data.morerepalce.concat(res.data.data.replies)
          })
        }
      })
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.setData({
        commentdata: this.properties.commentdata
      })
    },
    moved: function () { },
    detached: function () { },
  },
})
