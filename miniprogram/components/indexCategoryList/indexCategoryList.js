// components/indexCategoryList/indexCategoryList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cateList: Array
  },

  options: {
    // 允许外部样式类在组件内生效
    styleIsolation: 'apply-shared',
  },

  /**
   * 组件的初始数据
   */
  data: {
    categoryList: []
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


    goToDetail(e) {
      let val = e.currentTarget.dataset.val
      let albumInfoId = val.albumInfo.id
      let anchorInfoId = val.anchorInfo.id
      wx.navigateTo({
        url: `/pages/detail/detail?albumInfoId=${albumInfoId}&anchorInfoId=${anchorInfoId}`,
      })
    }
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      let CategoryList = this.properties.cateList
      CategoryList.map((item) => {
        let count = item.statCountInfo.playCount
        item.statCountInfo.playCount = this._tranNumber(count, 2)
      })
      this.setData({
        categoryList: CategoryList
      })
      // console.log(this.data.categoryList)
    }
  }
})