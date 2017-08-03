var http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/xml"});
    var hello = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><main>Hello word</main>';
    res.end(hello);
}).listen(3000, 'localhost', function(){
	console.log("Servidor rodando na porta 3000");
});