const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ExpenseTracker',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
usePassport(app)
app.use(routes)

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`)
})