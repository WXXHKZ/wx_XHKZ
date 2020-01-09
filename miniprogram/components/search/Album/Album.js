// components/search/Album/Album.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'searchdata':Object,
    'value':String
  },

  /**
   * 组件的初始数据
   */
  data: {
    datalist:[],
    page:1
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

    handlescrollbottom:function(){
      this.setData({
        page: this.data.page+1
      })
      wx.request({
        url: `https://m.ximalaya.com/m-revision/page/search?kw=${this.properties.value}&core=all&page=${this.data.page}&rows=20`,
        method: 'get',
        success: (res) => {
          let CategoryList = res.data.data.albumViews.albums
          CategoryList.map((item) => {
            let count = item.albumInfo.play
            item.albumInfo.play = this._tranNumber(count, 2)
          })
          this.setData({
            datalist: this.data.datalist.concat(res.data.data.albumViews.albums)
          })
        }
      })
    },
    handletodetail:function(e){
      wx.navigateTo({
        url: `/pages/detail/detail?albumInfoId=${e.currentTarget.dataset.albuminfoid}&anchorInfoId=${e.currentTarget.dataset.anchorinfoid}`,
      })
    }

  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      let CategoryList = this.properties.searchdata.albumViews.albums
      CategoryList.map((item) => {
        let count = item.albumInfo.play
        item.albumInfo.play = this._tranNumber(count, 2)
      })
      this.setData({
        datalist: this.properties.searchdata.albumViews.albums,
      })
    },
    moved: function () { },
    detached: function () { },
  },
})
