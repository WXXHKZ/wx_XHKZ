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

  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      wx.request({
        url: 'https://m.ximalaya.com/m-revision/page/index/queryIndexCategoryTabContent?moduleKey=youshengshu',
        dataType: 'json',
        success: (res) => {
          this.setData({
            starList: res.data.data.moduleContent.moduleRankDatas[0].albumBriefDetailInfos.slice(0, 3)
          })
          console.log(this.data.starList)
        }
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})