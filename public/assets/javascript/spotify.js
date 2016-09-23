console.log('spotify loaded')


var spotifyApi = new SpotifyWebApi();

var queryURL = 'https://accounts.spotify.com/authorize';
var clientID = 'c06624947f124dcbb0d4375eb2336a40';
var clientSecret = '130f9ea58eea4a839fe40a4fcd2912fc';

OAuth.initialize('OH3J6Mqg1mBKNjN24ew-znaon0w');

// Spotify Authorization Popup
OAuth.popup('spotify')
	.done( function (result){
		console.log(result)
		console.log('got a result!')
	})
	.fail( function (err) {
		console.log('failed')
		console.log(err)
});


// get playlists tagged with category
