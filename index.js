var http = require('http');
var mongoose = require('mongoose');
var env = require('dotenv').load();    //Use the .env file to load the variables

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!");

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);

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
}));

var p = new Person({
    name: "Fabian"
})

p.save((err, savePerson) => {
    console.log(JSON.stringify(savePerson));
});

/* npm install
npm install mongoose --save
create .env file
add require
add last paragraph 
populate .env
*/