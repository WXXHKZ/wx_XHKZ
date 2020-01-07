// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     listdata:[],
     historydata:["德云社"],
     value:'',
     searchdata:'',
     voicedata:'',
     anchordata:'',
     showSign:"1"
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: 'https://search.ximalaya.com/hotWordBillboard/list/2.0?categoryId=-1&size=8',
      method: 'get',
      success:(res)=>{
        this.setData({
          listdata: res.data.hotWordResultList
        })
      }
    })
  },

  
  handledelate:function(){
    this.setData({
      historydata: ''
    })
  },

  handleinput:function(e){
    this.setData({
      value: e.detail.value
    })
  },

  handleclear:function(e){
    this.setData({
      value:''
    })
    this.setData({
      searchdata: ''
    })
  },

  handlesearch:function(e){
      wx.request({
        url: `https://m.ximalaya.com/m-revision/page/search?kw=${this.data.value}&core=all&page=1&rows=20`, 
        method: 'get',
        success: (res) => {
          this.setData({
            searchdata: res.data.data
          })
        }
      })
    let sign=false
    for (let i = 0; i < this.data.historydata.length;i++){
      if (this.data.value === this.data.historydata[i]){
        sign = true
      }
    }
    if (!sign){
      this.setData({
        historydata: this.data.historydata.concat(this.data.value)
      })
    }
    wx.request({
      url: `https://m.ximalaya.com/m-revision/page/search?kw=${this.data.value}&core=track&page=1&rows=20`,
      method: 'get',
      success: (res) => {
        this.setData({
          voicedata: res.data.data
        })
        
      }
    })
    wx.request({
      url: `https://m.ximalaya.com/m-revision/page/search?kw=${this.data.value}&core=user&page=1&rows=20&condition=voice`,
      method: 'get',
      success: (res) => {
        this.setData({
          anchordata: res.data.data
        })
        console.log(res)
      }
    })

    
  },
//搜索页面主播模块
  //https://m.ximalaya.com/m-revision/page/search?kw=${this.data.value}&core=user&page=1&rows=20&condition=voice
//搜索页面声音模块
  //https://m.ximalaya.com/m-revision/page/search?kw=${this.data.value}&core=track&page=1&rows=20

  handletosearch:function(e){
    this.setData({
      value: e.currentTarget.dataset.content
    })
  },

  handlechange:function(e){
    this.setData({
      showSign: e.currentTarget.dataset.order
    })
  }
  
})