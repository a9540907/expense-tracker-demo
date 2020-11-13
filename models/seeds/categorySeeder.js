if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
const Category = require('../category')
const db = require('../../config/mongoose')
const categoryList = require('../../categoryList.json').results


// db.once('open', () => {
//   Category.create(categoryList)
//   console.log('mongodb connected!')
// })

db.once('open', () => {
  return Promise.all(Array.from(
    { length: categoryList.length },
    (_, i) => {
      return Category.create({
        category: categoryList[i].category,
        icon: categoryList[i].icon
      })
    }
  ))
    .then(() => {
      console.log('done.')
      process.exit()
    })
})