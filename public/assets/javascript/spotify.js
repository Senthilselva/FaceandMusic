console.log('spotify loaded');

var spotifyApi = new SpotifyWebApi();

function loginWithSpotify() {
    var client_id = 'c06624947f124dcbb0d4375eb2336a40';
    //var redirect_uri = 'https://spotifyapp-564b4.firebaseapp.com/spotifytest.html';
    var redirect_uri = "https://spotifyappjm.firebaseapp.com/index.html"
    var scopes = 'playlist-modify-public';
    if (document.location.hostname == 'localhost') {
        redirect_uri = 'http://localhost:8000/index.html';
    }
    var url = 'https://accounts.spotify.com/authorize?client_id=' + client_id +
        '&response_type=token' +
        '&scope=' + encodeURIComponent(scopes) +
        '&redirect_uri=' + encodeURIComponent(redirect_uri);
    document.location = url;
}

function callSpotify(url, data) {
    return $.ajax(url, {
        dataType: 'json',
        data: data,
        headers: {
            'Authorization': 'Bearer ' + credentials.token
        }
    });
}

// OAuth.initialize('OH3J6Mqg1mBKNjN24ew-znaon0w');

// // Spotify Authorization Popup
// OAuth.redirect('spotify', callbackURL)
// 	.then(function(oathResult) {
// 		return oathResult.get('/me');
// 	}).then(function(data){
// 		console.log(data)

// 	}).fail(function(err){
// 		console.log(err)

// 	});

// OAuth.callback('spotify').done(function(){
// 	console.log('callback')
// })
	// .done( function (result){
	// 	console.log(result)
	// 	console.log('got a result!')
	// })
	// .fail( function (err) {
	// 	console.log(err)
	// 	console.log('failed')

// var spotify = OAuth.create('spotify');
// console.log(spotify)


// get playlists tagged with category
// {
//   "projects": {
//     "default": "spotifyapp-564b4"
//   }
// }
