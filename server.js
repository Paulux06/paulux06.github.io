var http = require('http');
var fs   = require('fs');

http.createServer(function(req, res) {
    req.url = '.'+req.url;
    console.log(req.url);
    if (req.url == './')
    {
        res.end(fs.readFileSync('./index.html'));
        return;
    }
    res.end(fs.readFileSync(req.url));
    
}).listen(80);