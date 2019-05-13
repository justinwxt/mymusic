// miniprogram/pages/searchSong/searchSong.js
const qqMusicTool = require('../../utils/QQMusicPlugin/qqMusicTools.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchWords:'',
    searchResults:[],  //搜索到的歌曲列表
    dirs:[],
    isShowDirs:false,
    currentSong:{},    //准备添加的歌曲
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({dirs:app.dirs})
  },
  //输入搜索关键词
  inputKeywords(e){
    this.setData({ searchWords:e.detail.value})
  },
  //搜索关键词
 async search(){
    let searchWords = this.data.searchWords
    //page number keyword
    try{
      let searchSongsList = await qqMusicTool.searchMusic(0, 10, searchWords)
      let  searchResults =  searchSongsList;
      if(searchResults.length == 0){
        wx.showToast({
          title: '没有免费的资源',
          icon:'none'
        })
      }
      this.setData({searchResults})
      // console.log(searchSongsList)
    }catch(e){
      wx.showToast({
        title: '获取失败',
        icon:'none'
      })
    }
     
  },
  //显示文件夹
  showDirs(e){
    if(app.dirs.length == 0){
      wx.showToast({
        title: '暂无文件夹,请去首页添加',
        icon:'none'
      })
      return
    }
    this.setData({isShowDirs:true,currentSong:e.target.dataset.item})
  },
  hideDirs(){
    this.setData({isShowDirs:false})
  },
  //添加当前歌曲到当前文件夹
  addToDir(e){
    wx.showLoading({
      title: '正在添加',
    })
    //生成歌曲连接
    let dirId = e.target.dataset.id;//父文件夹Id
    let currentSong = this.data.currentSong;
    qqMusicTool.playMusic(currentSong.songmid).then(res=>{
      //  console.log('歌曲连接',res)
       wx.cloud.callFunction({
         name:'addSongToDir',
         data:{
           songName: currentSong.songname,
           singer: currentSong.singer[0].name,
           src: res,
           dirId: dirId
         }
       }).then(res=>{
         wx.hideLoading()
         if(res){
           wx.showToast({
             title: '添加成功',
             icon:'none'
           })
         }else{
           wx.showToast({
             title: '添加失败',
             icon: 'none'
           })
         }
       })
     }).catch(res=>{
       wx.hideLoading()
       wx.showToast({
         title: '添加失败',
         icon:'none'
       })
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