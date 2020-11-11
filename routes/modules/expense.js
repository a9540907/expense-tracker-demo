const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')


router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(item =>
      res.render('new', { item })
    )
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, amount, category } = req.body
  // console.log(category)
  // console.log(req.body.category)
  Category.find()
    .lean()
    .then(item => {
      const selectIcon = item.filter(select => {
        return select.category === category
      })
      return Record.create({ name, category, date, amount, icon: selectIcon[0].icon, userId })
        .then(() => res.redirect('/'))
        .catch(error => {
          console.log(error)
          res.sendStatus(404)
        }
        )
    })
})


router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(item => {
          //將date object 轉成string
          record.date = record.date.toLocaleDateString()

          let select = item.findIndex(select => select.category === record.category)
          item.splice(select, 1)
          res.render('edit', { record, item })
        })
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(404)
    })
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, amount, category } = req.body

  return Record.findOne({ _id, userId })
    .then(record => {
      Category.find()
        .lean()
        .then(item => {
          const selectItem = item.filter(select => {
            return select.category === category
          })

          record.category = selectItem[0].category
          record.icon = selectItem[0].icon
          record.name = name
          record.date = date
          record.amount = amount
          return record.save()
        })
    })
    .then(() => res.redirect(`/`))
    .catch(error => {
      console.log(error)
      res.sendStatus(404)
    })
})


router.post('/:id/delete', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.sendStatus(404)
    })
})


module.exports = router