// components/blog-ctrl/blog-ctrl.js
let userInfo = {}
let timer; // 防抖处理
const db = wx.cloud.database()

// MnHRZoXL_xVvb5-eZW5WDegRn8-86Dc9jAYlp_r_tqU  推送模板id
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId: String,
    blog: Object
  },

  options: {
    // 允许外部样式类在组件内生效
    styleIsolation: 'apply-shared',
  },

  /**
   * 组件的初始数据
   */
  data: {
    loginShow: false, // 登录组件是否显示
    modalShow: false, // 底部弹出层是否显示
    content: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onSend(event) {
      // 插入数据库
      let formId = event.detail.formId
      let content = event.detail.value.content
      if (content.trim() === '') {
        wx.showModal({
          title: '评论内容不得为空',
          content: '',
        })
        return
      }

      wx.showLoading({
        title: '评价中',
        mask: true
      })
      db.collection('blog-comment').add({
        data: {
          content,
          createTime: db.serverDate(),
          blogId: this.properties.blogId,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }
      }).then((res) => {
        wx.hideLoading()
        wx.showToast({
          title: '评论成功',
        })

        // 推送模板消息
        wx.cloud.callFunction({
          name: 'sendMessage',
          data: {
            content,
            formId,
            blogId: this.properties.blogId,
          }
        }).then((res) => {
          console.log(res)
        })

        this.setData({
          modalShow: false,
          content: '',
        })

        // 父元素刷新评论页面
        this.triggerEvent('refreshCommentList')
      })

    },

    onComment() {
      // 判断用户是否授权
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: (res) => {
                userInfo = res.userInfo
                // 显示评论弹出层
                this.setData({
                  modalShow: true
                })
              }
            })
          } else {
            console.log(111)
            this.setData({
              loginShow: true
            })
          }
        }
      })
    },

    loginSucc(event) {
      userInfo = event.detail
      this.setData({
        loginShow: false
      }, () => {
        this.setData({
          modalShow: true
        })
      })
    },

    loginFail() {
      wx.showModal({
        title: '授权用户才能发布',
        content: '',
      })
    }
  }
})