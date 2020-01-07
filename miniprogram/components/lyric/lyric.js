// components/lyric/lyric.js

let lyricHeight = 0 // 一行歌词对应高度
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLyricShow: {
      type: Boolean,
      value: true
    },
    lyric: String
  },

  observers: {
    lyric(lrc) {
      if (lrc === '暂无歌词') {
        this.setData({
          lrcList: [{
            lrc,
            time: 0,
          }],
          nowLyricIndex: -1
        })
      } else {
        this._parseLyric(lrc)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lrcList: [],
    nowLyricIndex: 0, // 当前选中歌词的索引
    scrollTop: 0 // 滚动条滚动的高度
  },

  // 生命周期函数
  lifetimes: {
    ready() {
      // 获取手机详细信息
      wx.getSystemInfo({
        success: function (res) {
          // res为手机的具体信息,如品牌,电量,宽高等
          // 任何手机宽度换为 rpx 都是750
          // (res.screenWidth / 750)求出 1rpx 换为 px 的大小
          // 求出一行歌词所占的高度
          lyricHeight = res.screenWidth / 750 * 64
        },
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    update(currentTime) {
      // console.log(currentTime)
      let lrcList = this.data.lrcList
      if (lrcList.length === 0) {
        return
      }
      // console.log(lrcList)
      if (currentTime > lrcList[lrcList.length - 1].time) {

        if (this.data.nowLyricIndex != -1) {
          this.setData({
            nowLyricIndex: -1,
            scrollTop: lrcList.length * lyricHeight
          })
        }
      }
      for (let i = 0, len = lrcList.length; i < len; i++) {
        if (currentTime <= lrcList[i].time) {
          // console.log(lrcList[i])
          this.setData({
            nowLyricIndex: i - 1,
            scrollTop: (i - 1) * lyricHeight
          })
          break
        }
      }
    },

    _parseLyric(sLyric) {
      let line = sLyric.split('\n')

      let _lrcList = []

      line.forEach((elem) => {
        let time = elem.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
        if (time) {
          let lrc = elem.split(time)[1]

          // 把时间转换为秒
          let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
          let timeSeconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000
          _lrcList.push({
            lrc,
            time: timeSeconds,
          })
        }
      })

      this.setData({
        lrcList: _lrcList
      })
    }
  }
})