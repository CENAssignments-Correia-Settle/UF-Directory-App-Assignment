/* Fill out these functions using Mongoose queries*/

var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config'),
	listings = require('./listings.json');

mongoose.connect(config.db.uri);
	
var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
    Listing.findOne({code: 'LBW'}, function(err, listing) {
    if (err) throw err;
    else{
		if(listing)
			console.log('\nLibrary West Found:\n' + listing + '\n\n');
		else
			console.log('\nLibrary West Not Found:\n');
	}
    
   });
}; 

   

   
   
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
		
    Listing.findOneAndRemove({code:'CABL'},function(err, listing){
        if(err) throw err;
		if(listing)
			console.log('\nRemoving: ' + listing + '\n');
		else
			console.log('\nDid not find CABL.\n');
    })

};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */

  Listing.findOne({code: 'PHL'}, function(err, listing) {
    if (err) throw err;
    else{

		if(listing.address != 'Phelps Lab, Gainesville FL 32611-6350') {
			console.log('\nPhelps Lab Found:\n' + listing + '\n\n');

			listing.address = 'Phelps Lab, Gainesville FL 32611-6350';

			listing.save(function(err) {
				if (err) throw err;

				console.log('Phelps Lab Address Updated')
			})			

			console.log('\nPhelps Lab Found:\n' + listing + '\n\n');

		}
		else if (!listing) 
			console.log('\nPhelps Lab Not Found:\n');
		else
			console.log('\nPhelps Lab Already Updated:\n' + listing + '\n');
	}
    
   });
};

var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */

   Listing.find({}, function(err, listings) {
   		if (err) throw err;

   		console.log(listings);
   });

};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();