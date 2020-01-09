// components/indexCategory/indexCategory.js
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
    category:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      wx.request({
        url: 'https://www.chenxuejing.xyz/main/m-revision/page/index/queryIndexCategoryTabContent?moduleKey=youshengshu',
        dataType: 'json',
        success: (res) => {
          this.setData({
            category: res.data.data.moduleContent.moduleRankDatas
          })
        }
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})
