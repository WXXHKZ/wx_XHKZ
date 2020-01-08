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
    handlescrollbottom: function () {
      this.setData({
        page: this.data.page + 1
      })
      wx.request({
        url: `https://m.ximalaya.com/m-revision/page/search?kw=${this.properties.value}&core=track&page=${this.data.page}&rows=20`,
        method: 'get',
        success: (res) => {
          let CategoryList = res.data.data.trackViews.tracks
          CategoryList.map((item) => {
            let count = item.trackInfo.count_play
            let time = item.trackInfo.duration
            item.trackInfo.count_play = this._tranNumber(count, 2)
            item.trackInfo.duration = this._tranTime(time)
          })
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
      let CategoryList = this.properties.voicedata.trackViews.tracks
      CategoryList.map((item) => {
        let count = item.trackInfo.count_play
        let time = item.trackInfo.duration
        item.trackInfo.count_play = this._tranNumber(count, 2)
        item.trackInfo.duration = this._tranTime(time)
      })
      this.setData({
        datalist: this.properties.voicedata.trackViews.tracks
      })
    },
    moved: function () { },
    detached: function () { },
  },
})
