// components/progress-bar/progress-bar.js
let movableAreaWidth = 0
let movableViewWidth = 0
const backgroundAudioManager = wx.getBackgroundAudioManager()
// 当前播放秒数
let currentSec = -1

let duration = 0 // 当前歌曲总时长,以秒为单位
let isMoving = false // 表示当前进度条是否被拖拽,解决:进度条被拖动时和uodatetime时间有冲突的问题
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isSame: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime: {
      currentTime: '00:00',
      totalTime: '00:00'
    },
    movableDis: 0,
    progress: 0
  },

  lifetimes: {
    ready() {
      if (this.properties.isSame && this.data.showTime.totalTime === '00:00') {
        this._setTime()
      }
      // 获取进度条长度
      this._getMovabelDis()

      // 绑定对应事件
      this._bindBGMEvent()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onChange(event) {
      // console.log(event)
      if (event.detail.source === 'touch') {
        isMoving = true
        this.data.progress = event.detail.x / (movableAreaWidth - movableViewWidth) * 100,
          this.data.movableDis = event.detail.x
      }
    },

    onTouchEnd() {
      // let currentTimeFmt = this._dateFormat(Math.floor(backgroundAudioManager.currentTime))
      // 有时touchEnd时间后进度条仍然会触发一次onchange,所以需要在onPlay时再加一次false
      isMoving = false
      this.setData({
        progress: this.data.progress,
        movableDis: this.data.movableDis,
        // ['showTime.currentTime']: currentTimeFmt.min + ":" + currentTimeFmt.sec
      })
      backgroundAudioManager.seek(duration * this.data.progress / 100)
    },

    _getMovabelDis() {
      const query = this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec((rect) => {
        // 以数组形式存储select结果
        // console.log(rect)
        movableAreaWidth = rect[0].width
        movableViewWidth = rect[1].width
      })
    },

    _bindBGMEvent() {
      // 播放时
      backgroundAudioManager.onPlay(() => {
        // console.log('onPlay')
        // 有时touchEnd时间后进度条仍然会触发一次onchange,所以在播放时再加一次false
        isMoving = false
        this.triggerEvent('musicPlay')
      })

      // 停止播放
      backgroundAudioManager.onStop(() => {
        // console.log('onStop')
      })

      // 暂停播放
      backgroundAudioManager.onPause(() => {
        // console.log('onPause')
        this.triggerEvent('musicPause')
      })

      // 监听音频正在加载当中
      backgroundAudioManager.onWaiting(() => {
        // console.log('onWaiting')
      })

      // 音乐可以播放
      backgroundAudioManager.onCanplay(() => {
        // console.log('onCanplay')

        // duration 为获取播放总时长,这个方法有时会获得undefined
        // console.log(backgroundAudioManager.duration)
        if (backgroundAudioManager.duration !== undefined) {
          this._setTime()
        } else {
          // 一般的机型延迟一秒后再次获取就能获取到了
          setTimeout(() => {
            this._setTime()
          }, 1000)
        }
      })

      // 音乐播放进度(仅限于前台,加入用户接电话,小程序变为后台运行,则不会触发)
      backgroundAudioManager.onTimeUpdate(() => {
        // console.log('onTimeUpdate')
        if (!isMoving) {
          const currentTime = backgroundAudioManager.currentTime
          const duration = backgroundAudioManager.duration
          const sec = currentTime.toString().split('.')[0]
          if (sec != currentSec) {
            // console.log(sec)
            const currentTimeFmt = this._dateFormat(currentTime)
            this.setData({
              movableDis: (movableAreaWidth - movableViewWidth) * currentTime / duration,
              progress: currentTime / duration * 100,
              ['showTime.currentTime']: `${currentTimeFmt.min}:${currentTimeFmt.sec}`
            })
            currentSec = sec

            // 联动歌词
            this.triggerEvent('timeUpdate', {
              currentTime
            })
          }
        }

      })

      // 播放结束
      backgroundAudioManager.onEnded(() => {
        // console.log('onEnded')
        this.triggerEvent('musicEnd')
      })

      // 播放出错
      backgroundAudioManager.onError((res) => {
        // console.log('onEnded')
        console.log(res.errMsg)
        console.log(res.errCode)
        wx.showToast({
          title: '错误' + res.errCode,
        })
      })
    },

    _setTime() {
      duration = backgroundAudioManager.duration
      // console.log(duration)
      const durationFmt = this._dateFormat(duration)
      // console.log(durationFmt)
      this.setData({
        ['showTime.totalTime']: `${durationFmt.min}:${durationFmt.sec}`
      })
    },

    _dateFormat(sec) {
      // 分钟
      const min = Math.floor(sec / 60)

      // 秒
      sec = Math.floor(sec % 60)

      return {
        'min': this._PrefixZero(min, 2),
        'sec': this._PrefixZero(sec, 2)
      }
    },

    // 前置补0
    _PrefixZero(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    }
  }
})