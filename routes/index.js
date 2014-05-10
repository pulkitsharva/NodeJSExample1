var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('myData');
	collection.find(function(e,docs){
        res.render('userList', {
            "userlist" : docs
		});
    });
});

router.get('/newUser',function(req,res)
{
	res.render('newUserPage',{title:'Registration Form'});
}
);

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.userName;
    var userEmail = req.body.email;

    // Set our collection
    var collection = db.get('myData');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userList");
            // And forward to success page
            res.redirect("userList");
        }
    });
});

router.get('/home',function(req,res){
	res.render("home",{title:'Home'});
});

router.post('/login',function(req,res){
	console.log("Login page");
	res.location("home");
	res.redirect("home");
});

module.exports = router;
