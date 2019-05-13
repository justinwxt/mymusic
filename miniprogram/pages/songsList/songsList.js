// miniprogram/pages/songsList/songsList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songsList:[],
    currentSong:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.dirId = options.dirId;
   
    this.bgmctx= wx.getBackgroundAudioManager()
  },
  //获取歌曲列表
  getSongsList(){
    wx.cloud.callFunction({
      name:'getSongs',
      data:{
        dirId:this.dirId
      }
    }).then(res=>{
      console.log(res)
      let songsList = res.result.data;
      if(songsList.length == 0){
        wx.showToast({
          title: '暂无歌曲,请搜索添加',
          icon:'none'
        })
        return
      }
      
      songsList.forEach(ele=>ele.isPlaying = false)
      this.setData({
        songsList:res.result.data
      })
    })
  },
 
  //播放
  palyMusic(e){
    let currentSong = this.data.currentSong;
    let songItem = e.target.dataset.item;
    if(currentSong._id){
      //当前正在播放某首歌
      //判断当前点击的是否为正在播放的歌曲
      if(currentSong._id == songItem._id){
        //如果相等，则根据状态设为暂停或者播放  更新列表
        if(songItem.isPlaying){
          this.bgmctx.pause();
        }else{
          this.bgmctx.play();
        }
        this.updatePlayState(songItem)
      }else{
        //重新播放另一首歌
        this.startSomeSong(songItem);
      }
    }else{
      //当前没有在播放 
      this.startSomeSong(songItem);
    }
    
    this.setData({currentSong:songItem})
    
  },
  //更新某首歌的播放状态
  updatePlayState(songItem){
    let songsList = this.data.songsList;
    songsList.forEach(ele => {
      if (ele._id == songItem._id) {
        ele.isPlaying = !ele.isPlaying;
      }
    })
    this.setData({ songsList })
  },
  //重新播放某首歌
  startSomeSong(songItem){
    let songsList = this.data.songsList;
    this.bgmctx.src = songItem.src;
    this.bgmctx.title = songItem.songName;
    this.bgmctx.singer = songItem.singer;
    this.bgmctx.onCanplay(() => {
      this.bgmctx.play();
      songsList.forEach(ele => {
        if (ele._id == songItem._id) {
          ele.isPlaying = true;
        } else {
          ele.isPlaying = false;
        }
      })
      this.setData({ songsList })
    })
  },
  //跳转到搜索页
  toSearchSong(){
    wx.navigateTo({
      url: '../searchSong/searchSong',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取歌曲列表
    this.getSongsList()
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