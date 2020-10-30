const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

//首頁
router.get('/', (req, res) => {

  Record.find()
    .lean()
    .then(record => {
      let totalAmount = 0

      record.forEach(element => {
        totalAmount = totalAmount + (element.amount)
      })

      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(item =>
          res.render('index', { record, totalAmount: totalAmount.toLocaleString('zh-TW', { currency: 'TWD' }), item })
        )
    })

})

//篩選
router.get('/category', (req, res) => {
  const selectCategory = req.query.keyword
  // console.log(selectCategory)
  // console.log('-----')
  Record.find()
    .lean()
    .then(record => {
      const select = record.filter(item => {
        return item.category === selectCategory
      })
      // console.log(select)
      let totalAmount = 0
      select.forEach(element => {
        totalAmount = totalAmount + (element.amount)
      })

      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(item =>
          res.render('index', { record: select, totalAmount: totalAmount.toLocaleString('zh-TW', { currency: 'TWD' }), item, selectCategory })
        )
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(404)
    })
})

module.exports = router