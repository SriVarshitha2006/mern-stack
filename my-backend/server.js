const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))

app.set('view engine','ejs')

app.get('/',(req,res) => {
    console.log('here')
    res.render('index',{ text : 'world'})
})

const userouter = require('./routes/users')
//app.use(logger)

app.use('/users',userouter)

// function logger(req,res,next){
//     console.log(req.originalUrl)
//     next()
// }
app.listen(3000)
