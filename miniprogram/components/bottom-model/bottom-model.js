// components/bottom-modal/bottom-modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalShow: Boolean
  },

  // 第三种引入外部样式类的方法
  options: {
    // 允许外部样式类在组件内生效
    styleIsolation: 'apply-shared',

    // 想使用多个插槽必须要加上这句话
    multipleSlots: true
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({
        modalShow: false
      })
    }
  }
})