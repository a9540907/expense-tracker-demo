const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const Record = require('../record')
const db = require('../../config/mongoose')
const User = require('../user')
const recordList = require('../../recordList.json').results

const SEED_USER = {
  name: 'test',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {

      const userId = user._id
      return Promise.all(Array.from(
        { length: recordList.length },
        (_, i) => {
          const { name, category, icon, date, amount, merchant } = recordList[i]
          return Record.create({ name, category, date, icon, amount, merchant, userId })
        }
      ))
        .then(() => {
          console.log('done')
          process.exit()
        })
    })
})
