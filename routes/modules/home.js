const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

//首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  const months = []
  for (let i = 1; i <= 12; i++) {
    months.push({ name: `${i}月`, id: `${i}` })
  }
  Record.find({ userId })
    .lean()
    .then(record => {
      //透過forEach並使用toLocaleDateString()轉換時間格式
      record.forEach((item, index, arr) => {
        arr[index].date = item.date.toLocaleDateString()
      })

      let totalAmount = 0

      record.forEach(element => {
        totalAmount = totalAmount + (element.amount)
      })

      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(item => {
          res.render('index', { record, totalAmount: totalAmount.toLocaleString('zh-TW', { currency: 'TWD' }), item, months })
        })
    })

})

//篩選
router.get('/category', (req, res) => {
  const selectCategory = req.query.category
  let selectMonth = req.query.months
  const userId = req.user._id

  const months = []
  for (let i = 1; i <= 12; i++) {
    months.push({ name: `${i}月`, id: `${i}` })
  }

  Record.find({ userId })
    .lean()
    .then(record => {
      selectMonth = selectMonth - 1

      const select = record.filter(item => {
        if (selectCategory) {
          return item.category === selectCategory
        } else {
          return item.date.getMonth() === selectMonth
        }
      })

      select.forEach((item, index, arr) => {
        arr[index].date = item.date.toLocaleDateString()
      })

      let totalAmount = 0
      select.forEach(element => {
        return totalAmount = totalAmount + (element.amount)
      })

      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(item =>
          res.render('index', { record: select, totalAmount: totalAmount.toLocaleString('zh-TW', { currency: 'TWD' }), item, selectCategory, months })
        )
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(404)
    })
})

module.exports = router