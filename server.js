var express = require('express');

var app = express();

app.use(express.static(__dirname));

var mockData = [
    { text: 'One', value: 1 },
    { text: 'Two', value: 2 },
    { text: 'Three', value: 3 },
    { text: 'Four', value: 4 },
    { text: 'Five', value: 5 },
];

app.get('/data', function(req, res) {
    var searchStr = req.query.search;

    res.send(mockData.filter(function(c) { return c.text.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1 }));
});

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Server started on port %s', port);
})
