const mongoose = require('mongoose')
const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  Category.create(
    {
      category: '家居物業',
      icon: 'fas fa-home'
    },
    {
      category: '餐飲食品',
      icon: 'fas fa-utensils'
    },
    {
      category: '休閒娛樂',
      icon: 'fas fa-grin-beam'
    },
    {
      category: '交通出行',
      icon: 'fas fa-shuttle-van'
    },
    {
      category: '其他 ',
      icon: 'fas fa-pen'
    }
  )
})