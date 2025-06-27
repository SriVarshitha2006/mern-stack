

const express = require('express')
const router = express.Router()

router.use(logger)

router.get('/',(req,res) => {
    console.log(req.query.name)
  res.send('user list')
})


router.get('/new',(req,res) => {
  console.log(req.user)
  res.render('users/new',{firstName : 'test'})
})

router.post('/',(req,res) => {
    const isvalid = true
    if(isvalid){
        users.push({firstName : req.body.firstName})
        res.redirect(`/users/${users.length-1}`)
    }
    else{
        console.log("error")
        res.render('users/new', {firstName : req.body.firstName})
    }
    console.log(req.body.firstName)
    res.send('hi')
    //res.send('create user')
})

router.route('/:id')
.get((req,res) => {
    console.log(req.user)
    res.send(`create user get ${req.params.id}`)
}).put((req,res) => {
    res.send(`update user get ${req.params.id}`)
}).delete((req,res) => {
    req.params.id
    res.send(`delete user get ${req.params.id}`)
})

const users = [{ name : 'kyle'} , { name : 'sally'}]
router.param('id',(req,res,next,id) => {
    //console.log(id)
    req.user = users[id]
    next()
})


function logger(req,res,next){
    console.log(req.originalUrl)
    next()
}

// router.get('/:id',(req,res) => {
//     req.params.id
//     res.send(`create user get ${req.params.id}`)
// })


// router.put('/:id',(req,res) => {
//     req.params.id
//     res.send(`update user get ${req.params.id}`)
// })


// router.delete('/:id',(req,res) => {
//     req.params.id
//     res.send(`delete user get ${req.params.id}`)
// })

module.exports = router