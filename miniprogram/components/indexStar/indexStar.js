// components/indexStar/indexStar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    starList: []
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
    }

  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      wx.request({
        url: 'https://m.ximalaya.com/m-revision/page/index/queryIndexCategoryTabContent?moduleKey=youshengshu',
        dataType: 'json',
        success: (res) => {
          let StarList = res.data.data.moduleContent.moduleRankDatas[0].albumBriefDetailInfos.slice(0, 3)
          StarList.map((item) => {
            let count = item.statCountInfo.playCount
            item.statCountInfo.playCount = this._tranNumber(count, 2)
          })
          this.setData({
            starList: res.data.data.moduleContent.moduleRankDatas[0].albumBriefDetailInfos.slice(0, 3)
          })
        }
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})