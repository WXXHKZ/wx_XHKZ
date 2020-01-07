// components/search/Album/Album.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'voicedata': Object,
    'value': String
  },

  /**
   * 组件的初始数据
   */
  data: {
    datalist: [],
    page: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlescrollbottom: function () {
      this.setData({
        page: this.data.page + 1
      })
      wx.request({
        url: `https://m.ximalaya.com/m-revision/page/search?kw=${this.properties.value}&core=track&page=${this.data.page}&rows=20`,
        method: 'get',
        success: (res) => {
          this.setData({
            datalist: this.data.datalist.concat(res.data.data.trackViews.tracks)
          })
        }
      })
    }

  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.setData({
        datalist: this.properties.voicedata.trackViews.tracks
      })
    },
    moved: function () { },
    detached: function () { },
  },
})
