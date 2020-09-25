const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const Record = require('./models/record')
const Category = require('./models/category')


mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {

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



app.get('/expense/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(item =>
      res.render('new', { item })
    )
})

app.post('/expense', (req, res) => {
  const { name, date, amount, category } = req.body
  console.log(category)
  console.log(req.body.category)
  Category.find()
    .lean()
    .then(item => {
      const selectIcon = item.filter(select => {
        return select.category === category
      })
      return Record.create({ name, category, date, amount, icon: selectIcon[0].icon })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})


app.get('/expense/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(item => {
          let select = item.findIndex(select => select.category === record.category)
          item.splice(select, 1)
          res.render('edit', { record, item })
        })
    })
    .catch(error => console.log(error))
})

app.post('/expense/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, date, amount, category } = req.body

  return Record.findById(id)
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
    .catch(error => console.log(error))
})


app.post('/expense/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('app is running on http://localhost:3000')
})