'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config'),
	listings = require('./listings.json');

/* Connect to your database */
//var MongoClient = require('mongodb').MongoClient;

//MongoClient.connect('mongodb://Correia:passAA7word@ds047355.mongolab.com:47355/correiasettleassignment3');
mongoose.connect('mongodb://test:test@ds047355.mongolab.com:47355/cen_bootcamp');

//console.log(listings.length);

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
for(var i in listings.entries){
	//console.log('\nIm in the for loop. i = ' + i);
	
	//console.log('Name and code' + listings.entries[i].name + ' ' + listings.entries[i].code);
	//console.log('\n' + listings[0].name);

	var newListing = new Listing({
		code: listings.entries[i].code,
		name: listings.entries[i].name,
		//if(!listings.entries[i].coordinates)
			coordinates: listings.entries[i].coordinates,
		//if(!listings.entries[i].address)
			address: listings.entries[i].address
	});
	console.log('\ncode:' + newListing.code);
	console.log('\nname:' + newListing.name);
	console.log('\naddress:' + newListing.address);
	
	newListing.save(function (err){
		console.log('Got to the save function.');
		if(err){
			console.log('\nError! Did not save.');
			throw err;
		}
		console.log('Entry saved successfully');
	});
}

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */