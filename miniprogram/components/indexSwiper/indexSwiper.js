// components/indexSwiper/indexSwiper.js
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
    swiperImgUrls: [{
        url: 'http://fdfs.xmcdn.com/group70/M07/C8/3F/wKgO2F4NtbPjar-NAAG6Bzqt_Ic667.jpg',
      },
      {
        url: 'http://fdfs.xmcdn.com/group72/M02/87/C3/wKgO0F4NtRDgev1YAAGEx1qy1Vs507.jpg',
      },
      {
        url: 'http://fdfs.xmcdn.com/group72/M01/87/F0/wKgO0F4NtrHgLjpMAAGmCSkT8o0701.jpg',
      },
      {
        url: 'http://fdfs.xmcdn.com/group68/M0B/E8/3B/wKgMeF3FYITCmbz6AAGT70SHlfo381.jpg',
      }
    ],
    playlist: [],
    index: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiper: function (e) {
      var index = e.detail.current
      this.setData({
        index: index
      })
    },
  }
})