const express = require('express')
const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index')
})

app.get('/signin', (req, res) => {
    res.render('signin')
})

//use alternative of body-parser later
app.post('/home', (req, res) => {
    res.render('home');
})

app.get('/form', (req, res) => {
    res.render('form');
})


app.get('/blog', (req, res) => {
    res.render('blog')
})




app.listen(5000)