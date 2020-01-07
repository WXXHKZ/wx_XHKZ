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
        id: '1',
        title: '音乐电台',
        url: 'http://fdfs.xmcdn.com/group57/M0A/3B/D0/wKgLgVyQuqWRZsJtAAAnr8tg4rs307.png'
      }, {
        id: '2',
        title: '言情',
        url: 'http://fdfs.xmcdn.com/group63/M03/00/EF/wKgMclz13MPBZzrTAACa07xW7PU710.png'
      },
      {
        id: '3',
        title: '都市',
        url: 'http://fdfs.xmcdn.com/group63/M03/00/E8/wKgMaFz13MjDAnt_AACVeUyfRiA157.png'
      },
      {
        id: '4',
        title: '悬疑',
        url: 'http://fdfs.xmcdn.com/group63/M03/00/E9/wKgMaFz13M3jLqMZAADhZejycAc850.png'
      },
      {
        id: '5',
        title: '幻想',
        url: 'http://fdfs.xmcdn.com/group63/M05/00/E9/wKgMaFz13NHTvod5AACml8OQjPI794.png'
      },

      {
        id: '6',
        title: '全部分类',
        url: 'http://fdfs.xmcdn.com/group63/M03/00/F1/wKgMclz13NXj3_S6AAAO9ZkPU-I921.png'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTapNav(e) {
      console.log(e)
      const ds = e.currentTarget.dataset
      if (ds.id === '1') {
        wx.navigateTo({
          url: `/pages/playlist/playlist`,
        })
      }
    }
  }
})