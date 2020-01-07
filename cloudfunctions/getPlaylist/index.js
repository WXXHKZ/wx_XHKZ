// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const rp = require('request-promise')
const URL = 'http://musicapi.xiecheng.live/personalized'

const playlistCollection = db.collection('playlist')
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async(event, context) => {

  // -----------------------------------------
  // 突破获取云数据库数据条数的限制
  const countResult = await playlistCollection.count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }

  let list = {
    data: []
  }

  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }
  // -----------------------------------------

  // 云函数获取数据最多只能获取100条
  // 从小程序端获取数据最多只能获取20条
  // 本处为云函数,所以能获取100条
  // const list = await playlistCollection.get()

  const playlist = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })

  const newData = []
  for (let item1 of playlist) {
    let flag = true;
    for (let item2 of list.data) {
      if (item1.id === item2.id) {
        flag = false
        break
      }
    }
    if (flag) {
      newData.push(item1)
    }
  }



  for (let item of newData) {
    await playlistCollection.add({
      data: {
        ...item,
        createTime: db.serverDate(),
      }
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.log('插入失败')
    })
  }

  return newData.length
}