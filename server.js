require('autoinstall');
var http = require('http');
var AutoUpdater = require('auto-updater');
http.createServer((req, res) => {
var autoupdater = new AutoUpdater({
 pathToJson: '',
 autoupdate: true,
 checkgit: false,
 jsonhost: 'raw.githubusercontent.com',
 contenthost: 'codeload.github.com',
 progressDebounce: 0,
 devmode: false
});
	autoupdater.on('git-clone', function() {
	  console.log("You have a clone of the repository. Use 'git pull' to be up-to-date");
	});
	autoupdater.on('check.up-to-date', function(v) {
  		console.info("Você tem a ultima versão: " + v);
	});
	autoupdater.on('check.out-dated', function(v_old, v) {
  		console.warn("Sua versão é antiga. atual:" + v_old + " nova: " + v);
  		autoupdater.fire('download-update'); 
	});
	autoupdater.on('update.downloaded', function() {
	  console.log("Update downloaded and ready for install");
	  autoupdater.fire('extract');  
	});
	autoupdater.on('update.not-installed', function() {
	  console.log("The Update was already in your folder! It's read for install");
	  autoupdater.fire('extract');
	});
	autoupdater.on('update.extracted', function() {
	  console.log("Update extracted successfully!");
	  console.warn("RESTART THE APP!");
	});
	autoupdater.on('download.start', function(name) {
	  console.log("Starting downloading: " + name);
	});
	autoupdater.on('download.progress', function(name, perc) {
	  process.stdout.write("Downloading " + perc + "% \033[0G");
	});
	autoupdater.on('download.end', function(name) {
	  console.log("Downloaded " + name);
	});
	autoupdater.on('download.error', function(err) {
	  console.error("Error when downloading: " + err);
	});
	autoupdater.on('end', function() {
	  console.log("The app is ready to function");
	});
	autoupdater.on('error', function(name, e) {
	  console.error(name, e);
	});
	autoupdater.fire('check');
    res.writeHead(200, {"Content-Type": "text/xml"});
    var hello = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><main>Testando auto-updater e instalar automaticamente dependencias</main>';
    res.end(hello);
}).listen(3000, 'localhost', function(){
	console.log("Servidor rodando na porta 3000");
});