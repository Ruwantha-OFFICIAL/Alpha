const express = require('express');
const path = require('path');
const hbs = require('hbs');
const api = require('./routers/api.js');
const {
  rateLimit,
  MINUTE
} = require('express-rate-limit');

const limte = rateLimit({
  windowMs: 1 * MINUTE,
  limit: 18,
  legacyHeaders: false,
  standardHeaders: 'draft-8',
  statusCode: 429,
  message:{
    status: false,
    code: 429,
    err: "Request Out Of limit tray again 1 minutes"
  }
})

const app = express()
const port = 3000 || presses.env.PORT;
//view engin setup $hbs
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname + '/app/pages'))
hbs.registerPartials(path.join(__dirname + '/app/components'))
app.use(express.static(path.join(__dirname, 'app','public')))


app.get('/',(req,res)=>{
  res.render("index.hbs")
})
app.get('/doc',(req,res)=>{
  res.render("docs.hbs")
})
app.use('/api',limte, api)

app.use((req,res)=>{
  res.status(404).send("not found")
})
app.listen(port,()=> console.log(`Application is Start PORT ${port}`))