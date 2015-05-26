var spawn = require('child_process').spawn,
    shell = require('shelljs'),
    fs = require('fs'),
    path = require('path'),
    exec = require('./exec'),
    Q = require('q');
	
/**
 * Launches the specified node-webkit with the given URL.
 * Based on https://github.com/domenic/opener
 * @param {string} path Node Webkit. 
 * @return {Q} Promise to launch the specified browser
 */
exports.runNw = function (path,nameBinary) {
    var args;
		if(path === undefined){
			path = "";
		}
		if(nameBinary === undefined){
			nameBinary = 'nw.exe';
		}
		console.log(nameBinary);
		console.log(path);
        switch (process.platform) {
            case 'darwin':
                console.log("Not Implemented");
                break;
            case 'win32':                
                args = [path, nameBinary, process.cwd() + '/platforms/nw/build/package.nw'];
                break;
            case 'linux':
                console.log("Not Implemented");
                break;
        }        
        var command = args.join(" ");
        console.log("Executing comamnd: " + command);
        return exec(command);
}

