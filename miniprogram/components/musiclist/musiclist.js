// components/musiclist/musiclist.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    playingID: -1
  },

  pageLifetimes: {
    show() {
      // console.log(app.getPlayMusicId())
      this.setData({
        playingID: app.getPlayMusicId()
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onSelect(event) {

      const ds = event.currentTarget.dataset
      this.setData({
        playingID: ds.musicid
      })
      console.log(this.data.playingID)
      wx.navigateTo({
        url: `../../pages/player/player?musicID=${this.data.playingID}&index=${ds.index}`,
      })
    }
  }
})