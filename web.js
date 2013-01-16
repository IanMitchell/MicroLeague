var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');



app.get('/', function(request, response) {
  response.render("jade");
});



var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});