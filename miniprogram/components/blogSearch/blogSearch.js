// components/search/search.js
let keyword = ''
let timer; // 防抖处理
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeHolder: {
      type: String,
      value: '请输入...'
    }
  },

  // 接受外部传入的样式类,外部传递来的样式类无法被修改
  externalClasses: [
    'iconfont',
    'icon-sousuo'
  ],

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(event) {
      keyword = event.detail.value
    },
    onSearch() {
      // console.log(keyword)
      this.triggerEvent('search', {
        keyword
      })
    }
  }
})