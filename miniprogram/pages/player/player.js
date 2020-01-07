// pages/player/player.js
// 因为不需要在页面上显示,所以在这里定义数据
// 当前歌曲所在的歌单
let musicList = []
// 正在播放歌曲的index
let nowPlayingIndex = 0

// 获取全局惟一的背景音频管理器
const backgroundAudioManager = wx.getBackgroundAudioManager()
// 为了切换音乐后在音乐列表中对应高亮
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '',
    isPlaying: false, // 当前是否正在播放
    isLyricShow: false, // 表示当前歌词是否显示
    lyric: '歌词加载中', // 歌词
    isSame: false, // 表示是否为同一首歌
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    nowPlayingIndex = options.index
    // console.log(nowPlayingIndex)
    musicList = wx.getStorageSync('musiclist')
    this._loadMusicDetail(options.musicID)
  },

  _loadMusicDetail(musicId) {

    if (parseInt(musicId) === app.getPlayMusicId()) {
      this.setData({
        isSame: true
      })
    } else {
      this.setData({
        isSame: false
      })
    }

    if (!this.data.isSame) {
      backgroundAudioManager.stop()
    }
    let music = musicList[nowPlayingIndex]
    // console.log(musicId)
    wx.setNavigationBarTitle({
      title: music.name,
    })

    this.setData({
      picUrl: music.al.picUrl,
      isPlaying: false
    })

    wx.showLoading({
      title: '歌曲加载中',
    })

    app.setPlayMusicId(musicId * 1)

    wx.cloud.callFunction({
      name: 'music',
      data: {
        musicId,
        $url: 'musicUrl'
      }
    }).then((res) => {
      // console.log(res)
      // console.log(JSON.parse(res.result))
      let result = JSON.parse(res.result)
      if (!result.data[0].url) {
        wx.showToast({
          title: '该歌曲为会员专享',
        })
        return
      }
      if (!this.data.isSame) {
        backgroundAudioManager.src = result.data[0].url
        backgroundAudioManager.title = music.name
        backgroundAudioManager.coverImgUrl = music.al.picUrl
        backgroundAudioManager.singer = music.ar[0].name
        backgroundAudioManager.epname = music.al.name

        // 保存播放历史
        this._savePlayHistory()
      }

      this.setData({
        isPlaying: true
      })
      wx.hideLoading()

      // 加载歌词
      wx.cloud.callFunction({
        name: 'music',
        data: {
          musicId,
          $url: 'lyric'
        }
      }).then((res) => {
        console.log(JSON.parse(res.result))
        let lyric = '暂无歌词'
        const lrc = JSON.parse(res.result).lrc
        if (lrc) {
          lyric = lrc.lyric
        }

        this.setData({
          lyric
        })
      })

    })
  },

  togglePlaying() {
    if (this.data.isPlaying) {
      // 暂停播放
      backgroundAudioManager.pause()
    } else {
      backgroundAudioManager.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },

  onPlay() {
    this.setData({
      isPlaying: true
    })
  },
  onPause() {
    this.setData({
      isPlaying: false
    })
  },

  onPrev() {
    nowPlayingIndex--
    if (nowPlayingIndex < 0) {
      nowPlayingIndex = musicList.length - 1
    }
    this._loadMusicDetail(musicList[nowPlayingIndex].id)
  },

  onNext() {
    nowPlayingIndex++
    if (nowPlayingIndex === musicList.length) {
      nowPlayingIndex = 0
    }
    this._loadMusicDetail(musicList[nowPlayingIndex].id)
  },

  onChangeLyricShow() {
    this.setData({
      isLyricShow: !this.data.isLyricShow
    })
  },

  timeUpdate(event) {
    this.selectComponent('.lyric').update(event.detail.currentTime)
  },

  // 保存播放历史
  _savePlayHistory() {
    // 当前正在播放的歌曲
    const music = musicList[nowPlayingIndex]
    const openid = app.globalData.openId
    const history = wx.getStorageSync(openid)
    let bHave = false
    for (let i = 0, len = history.length; i < len; i++) {
      if (history[i].id == music.id) {
        bHave = true
        break
      }
    }
    if (!bHave) {
      history.unshift(music)
      wx.setStorage({
        key: openid,
        data: history,
      })
    }
  },
})