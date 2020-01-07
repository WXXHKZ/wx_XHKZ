//app.js
App({
  onLaunch: function() {
    this.checkUpdate()
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'xhkz-p07nv',
        traceUser: true,
      })
    }
    this.getOpenid()
    this.globalData = {
      playingMusicId: -1,
      openId: -1
    }
    this.skin()
  },
  getOpenid() {
    wx.cloud.callFunction({
      name: 'login'
    }).then((res) => {
      const openid = res.result.openid
      this.globalData.openId = openid
      if (!wx.getStorageSync(openid)) {
        wx.setStorage({
          key: openid,
          data: [],
        })
      }
    })
  },

  checkUpdate() {
    const updateManager = wx.getUpdateManager()
    // 检测版本更新
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好,是否重启应用',
            success(res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
      }
    })
  },

  setPlayMusicId(musicId) {
    this.globalData.playingMusicId = musicId
  },
  getPlayMusicId() {
    return this.globalData.playingMusicId
  },
  globalData: {
    userInfo: null,
    skin: 'normal',
    skinSwitch: '',
  },
  // 日间模式 tabBar
  setSunTabBar: function() {
    wx.setTabBarStyle({
      color: '#d8d8d8',
      selectedColor: '#f86442',
      backgroundColor: '#fff',
      borderStyle: 'white'
    })
  },
  // 夜间模式 tabBar
  setNightTabBar: function() {
    wx.setTabBarStyle({
      color: '#646566',
      selectedColor: '#954c3c',
      backgroundColor: '#313335',
      borderStyle: 'white'
    })
  },
  skin: function() {
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function(res) {
        that.globalData.skin = res.data
        if (that.globalData.skin === 'normal') {
          that.globalData.skinSwitch = false
          that.setSkinNormalTitle()
          that.setSunTabBar();
        } else {
          that.globalData.skinSwitch = true
          that.setSkinBlackTitle()
          that.setNightTabBar()
        }
      },
    })
  },
  //导航栏标题背景
  setNavBarBg: function() {
    var that = this
    if (that.globalData.skin == "normal") {
      that.setSkinNormalTitle()
    } else {
      that.setSkinBlackTitle()
    }
  },
  setSkinBlackTitle: function() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#313335',
    })
  },
  setSkinNormalTitle: function() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
  },
})