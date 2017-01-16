var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Lisää uusi asiakas' });
});
/////////////////////////////////////////////////////////////
/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var ID = parseInt(req.body.IDfield);
    var Nimi = req.body.Nimi;
    var Puh = req.body.Puh;
    var Kieli = req.body.kieli;//"Sv";//req.kieli.value;//rate_value;

    // Set our collection
    var collection = db.get('asiakkaat');

    // Submit to the DB
    collection.insert({
    	"ID" : ID,
        "Nimi" : Nimi,
        "Puh" : Puh,
        "Kieli" : Kieli
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});
/////////////////////////////////////////////////////////////
module.exports = router;

/* Get Userlist */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('asiakkaat');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});
/* Get by kieli */
router.post('/kielilist', function(req, res) {
	var Kielih = req.body.Kielihaku;
    var db = req.db;
    var collection = db.get('asiakkaat');
    collection.find({Kieli : Kielih},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* Get by ID */
router.post('/IDlist', function(req, res) {
	var IDh = parseInt(req.body.IDhaku);
    var db = req.db;
    var collection = db.get('asiakkaat');
    collection.find({ID : IDh},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});