// pages/scroll/scroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { alphabet: 'A', datas: ["asd","aweq","acxzc","abghj"] },
      { alphabet: 'B', datas: ["bfs","basdas"] },
      { alphabet: 'C', datas: ["cojgsd","clfgkhdf","cojfd","coqwei1","coitry"] },
      { alphabet: 'D', datas: ["dxcn","dcnvx","dxcx","dz"] },
      { alphabet: 'E', datas: ["easdzxc","ezxc"] },
      { alphabet: 'F', datas: ["fzxczx","f34er","fdsfsd","fzzxcz","fvcx"] },
      { alphabet: 'G', datas: ["gids","gzxmcn"] },
      { alphabet: 'H', datas: ["ha"] },
      { alphabet: 'I', datas: [] },
      { alphabet: 'J', datas: ["jasd","jaszxc","jzxc","jvbmvn","joiru"] },
      { alphabet: 'K', datas: ["ki","klxc","kasd","kbvcm","kxzc"] },
      { alphabet: 'L', datas: ["lsd","lxc"] },
      { alphabet: 'M', datas: ["mas","mdfgd","mcxvx"] },
      { alphabet: 'N', datas: ["nxzczx","ncv"] },
      { alphabet: 'O', datas: ["osadas","opcxv","oasdfdsa","ovxcbdg"] },
      { alphabet: 'P', datas: ["pad"] },
      { alphabet: 'Q', datas: ["qzxa","qfdsxcv"] },
      { alphabet: 'R', datas: ["rasda"] },
      { alphabet: 'S', datas: ["slkjxc","svcx","sngfh","smklkg","smcxw"] },
      { alphabet: 'T', datas: ["tsd","tdficx","tasda","togjf","topipdf","tqweqr","tcxzx"] },
      { alphabet: 'U', datas: [] },
      { alphabet: 'V', datas: [] },
      { alphabet: 'W', datas: ["wsad","wfrt","wogfd"] },
      { alphabet: 'X', datas: ["xi","xa"] },
      { alphabet: 'Y', datas: ["yfsd","ybgf","yasghfd"] },
      { alphabet: 'Z', datas: ["zvs","zasda"] },
    ],
    scroll: 'A',
    idx:0,
    isShow:false
  },
  getHeight: function(a,arrName,that){
    let heightArr = [];
    let h = 0;
    //创建节点选择器
    const query = wx.createSelectorQuery();
    //选择class
    query.selectAll('.'+a).boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为section-item的元素的信息 的数组
      res[0].forEach((item) => {
        // console.log(item.height)
        h += item.height;
        heightArr.push(h);
      })
      that.setData({
        [arrName]: heightArr
      })
    })
  },
  select:function(e){
    console.log(e.target.id.slice(0, 1))
    this.setData({ scroll: e.target.id.slice(0,1)})
  },
  move:function(e){
    // console.log(e.touches[0].clientY)
    var start = e.touches[0].clientY
    var top=(this.data.heightWin - this.data.heightNav[0])/2
    var i = Math.floor((start - top) / this.data.heightArr2[0])
    if(i>=0&&i<=this.data.list.length-1&&i!=this.data.idx){
      this.setData({ idx: i, scroll: this.data.list[i].alphabet,isShow:true })
      var n = this.data.idx
      var h = this.data.heightArr2[0]
      console.log(n, h, "--------------")
      this.setData({ tt: top + n * h })
    }
    
  },
  end:function(){
    this.setData({isShow: false })
  },
  scroll:function(e){
    var that=this
    // console.log(e)
    var top = e.detail.scrollTop
    var heightarr=this.data.heightArr1
    for (var i = 0; i <= heightarr.length-1 ; i++){
      if(top<heightarr[i]){
        if(i!=this.data.idx){
          this.setData({ idx: i })
        }
        return
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    /* this.data.list.map(function(item,index,arr){
      if (item.datas.length==0){
        arr.splice(index,1)
      }
    }) */
    var arr=this.data.list
    for (var i = arr.length-1 ; i >= 0 ; i--){
      if(arr[i].datas.length==0){
        console.log(i)
        this.data.list.splice(i,1)
      }
    }
    console.log(arr)
    this.setData({list:arr})
    that.getHeight('items', 'heightArr1', that)
    that.getHeight('nav', 'heightArr2', that)
    that.getHeight('navs', 'heightNav', that)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    wx.getSystemInfo({
      success: function(res) {
        /* console.log(res.windowWidth);
        console.log(res.windowHeight); */
        that.setData({ heightWin: res.windowHeight})
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})