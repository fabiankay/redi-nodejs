var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var env = require('dotenv').load();    //Use the .env file to load the variables

var app = express();

app.use(express.static(__dirname + '/view'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
  
// POST method route
app.post('/', function (req, res) {
    console.log(req.body);

    var p = new Person({
        name: req.body.user.name,
        lastname: req.body.user.lastname
    })
    
    p.save((err, savePerson) => {
        console.log(JSON.stringify(savePerson));
    });

    res.send('Submitted');
});

/* MongoDB Setup */

mongoose.connect('mongodb://'+process.env.COSMOSDB_DBNAME+'.documents.azure.com:10255/'+process.env.COSMOSDB_DBNAME+'?ssl=true', {
    auth: {
      user: process.env.COSMOSDB_DBNAME,
      password: process.env.COSMOSDB_PW
    }
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

var Person = mongoose.model('Person', new mongoose.Schema({
    name: String,
    lastname: String
}));