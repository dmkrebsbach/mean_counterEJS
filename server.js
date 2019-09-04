var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session');   // to handle session work
var app = express();
app.use(bodyParser.urlencoded({ extended: true })); // to handle POST Data

app.use(session({secret: 'thisisasecretshhhhhh!',  // to handle session work
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000}
    }));


app.use(express.static(path.join(__dirname, "./static"))); // to use Static Folder w/ index.html

app.set('views', path.join(__dirname, './views')); // to use views folder containing .ejs files
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if (req.session.count === undefined){
        req.session.count = 0;
    };
    req.session.count = req.session.count + 1;
    res.render('count', {count: req.session.count});
})

app.get('/addOne', function(req, res){
    if (req.session.count === undefined){
        req.session.count = 0;
    };
    req.session.count = req.session.count + 1;
    res.render('count', {count: req.session.count});
})

app.get('/addTwo', function(req, res){
    req.session.count = req.session.count + 1;
    // This adds 1, then redirects to page which automatically adds 1 - resulting in + 2. If it were +1 and used .render, hitting refresh would auto add 2 instead of 1! 
    res.redirect('/');
})

app.get('/reset', function(req, res){
    req.session.destroy();
    res.redirect('/');
})

app.listen(8000, function() {
    console.log("listening on port 8000");
});