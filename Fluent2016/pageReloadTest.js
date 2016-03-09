module.exports = {
	'Page reload test': function(client){
		client.url('http://www.yoursite.com/upload')
		.click('.upload-button')
		.waitForElementVisible('#uploader')
		// file list starts off empty
		.willReload('.uploaded-file-list')
		// upload a file
		.doFileUpload('selfie.jpg')
		// make sure upload is complete
		.waitForReload('.uploaded-file-list')
		// verify the list has the file in it
		.assert.containsText('.uploaded-file-list .filename', 'selfie')
		.end()
	}
};
