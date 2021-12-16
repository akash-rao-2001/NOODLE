const express = require('express')
const Article = require('./models/article')
const mongoose = require('mongoose')
var bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// mongoose.connect('mongodb://localhost:27017/blog', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// mongoose.connect('mongodb://localhost/blog')

var db = mongoose.connection;

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.set('views', './views')
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index')
})

app.post("", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    }
    app.locals.name = name;
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.redirect('/home')
})

app.get('/signin', (req, res) => {
    res.render('signin')
})

//use alternative of body-parser later
app.get('/home', (req, res) => {
    res.render('home', { error: false })
})
app.post('/home', (req, res) => {
    res.render('home')
})

app.get('/form', (req, res) => {
    res.render('form');
})
app.get('/about', (req, res) => {
    res.render('about');
})

//test 
app.get('/blog', async(req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('blog', { articles: articles })
})



app.get('/blog/:id', async(req, res) => {
    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('show', { article: article })
})

app.post('/blog', async(req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.exampleFormControlTextarea1
    })
    try {
        article = await article.save()
        res.redirect(`/blog`)
    } catch (e) {
        res.render('404')
    }
})
app.get('/contact', (req, res) => {
    res.render('contact');
})



app.get('/*', (req, res) => {
    res.render('404')
})

app.listen(5000)