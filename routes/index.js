const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expense = require('./modules/expense')
const users = require('./modules/users')

router.use('/', home)

router.use('/expense', expense)
router.use('/users', users)

module.exports = router