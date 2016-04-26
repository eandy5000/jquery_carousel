var express = require('express');
var app = express();
var data = require('./public/data/zeta.json');

app.use(express.static(__dirname + '/public'));

app.get('/data', function(req, res){
    res.send(data);
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
   console.log('listening on port: ', app.get('port')); 
});

module.exports = app;