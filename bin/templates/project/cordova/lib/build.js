#!/usr/bin/env node

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var path = require('path'),
    fs = require('fs'),
	zip = require('adm-zip'),
    clean = require('./clean'),
    shjs = require('shelljs'),    
    check_reqs = require('./check_reqs'),
    platformWwwDir          = path.join('platforms', 'nw', 'www'),
    platformBuildDir        = path.join('platforms', 'nw', 'build'),
    packageFile             = path.join(platformBuildDir, 'package.nw');
/**
 * buildProject
 *   Creates a zip file int platform/build folder
 */
exports.buildProject = function(){
	console.log("BUILD NW.JS");
    // Check that requirements are (stil) met
    if (!check_reqs.run()) {
        console.error('Please make sure you meet the software requirements in order to build a NW.JS cordova project');
        process.exit(2);
    }
    
    clean.cleanProject(); // remove old build result

    if (!fs.existsSync(platformBuildDir)) {
        fs.mkdirSync(platformBuildDir);
    }	
	
	var archiver = require('archiver');
	var zipArchive = archiver('zip');
	var output = fs.createWriteStream(packageFile);


	output.on('close', function() {
		console.log('NW.JS packaged app built in '+ packageFile);
		process.exit(0);
	});

	zipArchive.directory(platformWwwDir,false);
	zipArchive.pipe(output);

	zipArchive.finalize(function(err, bytes) {
		if(err) {
		  throw err;
		}   	
	});
  
};

module.exports.help = function() {
    console.log('Usage: cordova build NW.JS');
    console.log('Build will create the packaged app in \''+platformBuildDir+'\'.');
};
