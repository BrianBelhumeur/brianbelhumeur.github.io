module.exports = {
	'Feature test, basic and enhanced versions': function(client){
		client.url('http://www.yoursite.com/uploader')
		.featureTest(['FileReader', 'draggable'],
			function(){
				client.assert.visible('.enhanced-uploader');
			},
			function(unsupportedFeatures) {
				client.assert.visible('.basic-uploader');
			}
		)
		.end()
	},
	'Feature test, enhanced test only': function(client){
		client.url('http://www.yoursite.com/imageEditor')
		.featureTest(['FileReader', 'canvas'],
			function(){
				// test image editor here
			},
			function(unsupportedFeatures) {
				client.assert.ok(true, "Test skipped because " unsupportedFeatures.join(', ') + " not supported.");
			}
		)
		.end()
	}
};
