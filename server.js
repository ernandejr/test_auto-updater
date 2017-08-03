var http = require('http');
var AutoUpdater = require('auto-updater');
http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/xml"});
    var hello = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><main>Testando update</main>';
    res.end(hello);
}).listen(3000, 'localhost', function(){
	console.log("Servidor rodando na porta 3000");
});
var autoupdater = new AutoUpdater({
 pathToJson: '',
 autoupdate: true,
 checkgit: true,
 jsonhost: 'https://raw.githubusercontent.com/ernandejr/test_auto-updater/master/package.json',
 contenthost: 'https://github.com/ernandejr/test_auto-updater/archive/master.zip',
 progressDebounce: 0,
 devmode: false
});

autoupdater.on('git-clone', function() {
  console.log("You have a clone of the repository. Use 'git pull' to be up-to-date");
});
autoupdater.on('check.up-to-date', function(v) {
  console.info("You have the latest version: " + v);
});
autoupdater.on('check.out-dated', function(v_old, v) {
  console.warn("Your version is outdated. " + v_old + " of " + v);
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