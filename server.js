var http = require('http');
var AutoUpdater = require('auto-updater');
http.createServer((req, res) => {
var autoupdater = new AutoUpdater({
 pathToJson: '',
 autoupdate: true,
 checkgit: true,
 jsonhost: 'https://raw.githubusercontent.com/ernandejr/test_auto-updater/master/package.json',
 contenthost: 'https://github.com/ernandejr/test_auto-updater/archive/master.zip',
 progressDebounce: 0,
 devmode: false
});
autoupdater.on('check.out-dated', function(v_old, v) {
  	console.warn("Your version is outdated. " + v_old + " of " + v);
  	autoupdater.fire('download-update'); 
	autoupdater.on('update.downloaded', function() {
	  console.log("Update downloaded and ready for install");
	  autoupdater.fire('extract');  
	});
});
autoupdater.fire('check');
    res.writeHead(200, {"Content-Type": "text/xml"});
    var hello = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><main>Hello Word</main>';
    res.end(hello);
}).listen(3000, 'localhost', function(){
	console.log("Servidor rodando na porta 3000");
});