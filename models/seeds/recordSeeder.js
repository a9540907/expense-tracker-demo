const mongoose = require('mongoose')
const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  Record.create(
    {
      name: '租金',
      category: '家居物業',
      date: '2020-09-21',
      amount: 6000,
      icon: 'fas fa-home'
    },
    {
      name: '晚餐',
      category: '餐飲食品',
      date: '2020-09-21',
      amount: 120,
      icon: 'fas fa-utensils'
    },
    {
      name: '電影: 天能',
      category: '休閒娛樂',
      date: '2020-09-21',
      amount: 120,
      icon: 'fas fa-grin-beam'
    }
  )
})