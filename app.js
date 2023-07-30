const express = require('express')
const morgan = require('morgan')
const fortune = require('./lib/fortune.js')
// const expressHandlebars = require('express-handlebars')
const { engine: expressHandlebars } = require('express-handlebars')
const app = express()

app.engine('handlebars',expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(morgan('dev'))

app.use(express.static(__dirname + '/Public'))

app.get('/',(req,res)=> res.render('home'))

app.get('/about',(req,res)=>{
   res.render('about', {fortune: fortune.getFortune()})
})

app.use((req,res)=>{
    // res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})

app.use((err,req,res,next)=>{
    console.error(err.message)
    // res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
})

app.listen(port,()=>{
    console.log(
        `Express started on http://localhost:${port}; ` +
        `press Ctrl-C to terminate.`)
})




