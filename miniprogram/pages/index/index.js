//index.js
const app = getApp()
// const musicTool = require("../../utils/QQMusicPlugin/qqMusicTools.js")
Page({
  data: {
    addDirName:"",
    isAddDir:false,
    dirs:[],
  },

  onLoad: function() {
    //获取列表
    this.getDirList()
  },
  onShow(){
   
  },
  //获取文件夹列表
  getDirList(){
    wx.cloud.callFunction({
      name:'getDirs',
    }).then(res=>{
      // console.log(res)
      if(res){
        // if(res.result.data.length == 0){
        //   wx.showToast({
        //     title: '当前文件夹为空,请添加',
        //   })
        // }
        this.setData({dirs:res.result.data})
        app.dirs = res.result.data;
      }
    })
  },
  delDir(e){
    if(e.target.dataset.id == 888888){
      wx.showToast({
        title: '系统文件夹无法删除',
        icon:'none'
      })
      return
    }
    wx.showModal({
      title: '',
      content: '删除文件夹会导致其包含文件全部删除,确定删除吗?',
      success:res=>{
        if(res.confirm){
          let delId = e.target.dataset.id;
          wx.cloud.callFunction({
            name: 'delDir',
            data: {
              _id: delId
            }
          }).then(res => {
            if (res) {
              console.log(res.result)
            }
          })
        }
      }
    })
   
  },
  //进入歌曲列表页面
  toSongList(e){
    let dirId = e.target.dataset.id
    wx.navigateTo({
      url: '../songsList/songsList?dirId='+dirId,
    })
  },
  showCreatDirInput(){
    this.setData({isAddDir:true})
  },
  inputNewDir(e){
    this.setData({addDirName:e.detail.value})
  },
  createNewDir(){
    wx.showLoading({
      title: '创建中...',
    })
    //创建新的文件夹
    let newDirName = this.data.addDirName;
    wx.cloud.callFunction({
      name:'addDir',
      data:{
        newDirName
      }
    }).then(res=>{
      wx.hideLoading();
      this.setData({ isAddDir: false })
      if(res){
        wx.showToast({
          title: '创建成功',
          icon:'none'
        })
        this.getDirList();
      }else{
        wx.showToast({
          title: '创建失败',
          icon: 'none'
        })
      }
      console.log(res)
    })
 
  },
  cancelCreateNewDir(){
    this.setData({isAddDir:false})
  }

 

 

})
