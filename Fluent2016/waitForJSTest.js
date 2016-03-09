module.exports = {
	'Waiting for JavaScript basic test': function(client){
		client.url('http://www.yoursite.com/')
		.waitForJSReady()
		.assert.visible('.some-widget')
		.end()
	},
	'Waiting for JavaScript jQuery document.ready()': function(client){
		client.url('http://www.yoursite.com/')
		.waitForJSReady(function(){
			var iAmReady = false;
			$(function(){
				// this function runs synchronously if jQuery is ready
				iAmReady = true;
			});
			return iAmReady;
		})
		.click('.some-button')
		.end()
	},
	'Waiting for AJAX loaded test': function(client){
		client.url('http://www.yoursite.com/')
		.waitForJSReady(function(){
			var contentIsLoaded = false;
			YourAPI.friendsListLoaded.done(function(){
				contentIsLoaded = true;
			});
			return contentIsLoaded;
		})
		.assert.containsText('.friends-list', 'Kimberly Bryant')
		.end()
	}
};
