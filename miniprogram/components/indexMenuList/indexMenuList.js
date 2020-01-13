// components/indexMenuList/indexMenuList.js
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
    menuList: [{
        id: 'youshengshu',
        title: '有声书',
        itemCode: 'youshengshu',
        url: 'http://fdfs.xmcdn.com/group57/M0A/3B/D0/wKgLgVyQuqWRZsJtAAAnr8tg4rs307.png'
      }, {
        id: 'xiangsheng',
        title: '相声评书',
        itemCode: 'xiangshengpingshu',
        url: 'http://fdfs.xmcdn.com/group63/M03/00/EF/wKgMclz13MPBZzrTAACa07xW7PU710.png'
      },
      {
        id: 'yule',
        title: '娱乐',
        itemCode: 'yule',
        url: 'http://fdfs.xmcdn.com/group63/M03/00/E8/wKgMaFz13MjDAnt_AACVeUyfRiA157.png'
      },
      {
        id: 'yingshi',
        title: '影视',
        itemCode: 'yingshi',
        url: 'http://fdfs.xmcdn.com/group63/M03/00/E9/wKgMaFz13M3jLqMZAADhZejycAc850.png'
      },
      {
        id: 'qinggan',
        title: '情感生活',
        itemCode: 'qingganshenghuo',
        url: 'http://fdfs.xmcdn.com/group63/M05/00/E9/wKgMaFz13NHTvod5AACml8OQjPI794.png'
      },
      {
        id: 'lishi',
        title: '历史',
        itemCode: 'lishi',
        url: 'http://fdfs.xmcdn.com/group62/M03/01/75/wKgMcVz16F7ThbfSAABbYU4_QSM299.png'
      },
      {
        id: 'shangye',
        title: '商业财经',
        itemCode: 'shangyecaijing',
        url: 'http://fdfs.xmcdn.com/group62/M02/01/7F/wKgMcVz16RLyRN8gAAC4-7z2kGs871.png'
      },
      {
        id: '8',
        title: '全部分类',
        itemCode: '',
        url: 'http://fdfs.xmcdn.com/group63/M03/00/F1/wKgMclz13NXj3_S6AAAO9ZkPU-I921.png'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTapNav(e) {
      const ds = e.currentTarget.dataset
      console.log(ds.id)
      if (ds.id === '8') {
        wx.switchTab({
          url: `/pages/category/category`,
        })
      } else {
        wx.navigateTo({
          url: `/pages/cateContent/cateContent?allCode=${ds.id}`,
        })
      }
    }
  }
})