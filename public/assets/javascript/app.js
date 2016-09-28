var credentials = null;

$(document).ready(function() {

	console.log("document ready");

	checkAuthorization();

	$('#btnLogin').on('click', function(){
		OAuthManager.obtainToken({
          scopes: [
            /*
              the permission for reading public playlists is granted
              automatically when obtaining an access token through
              the user login form
              */
              'playlist-read-private',
              'playlist-read-collaborative',
              'playlist-modify-public',
              'playlist-modify-private'
            ]
          }).then(function(token) {
            onTokenReceived(token);
          }).catch(function(error) {
            console.error(error);
          });
	});


    // function to search spotify api for playlists
	$('#btnSearch').on('click', function(){

        // this query will be replaced with an emotion based on the image data
		var query = $('#search').val().trim();
		var url = 'https://api.spotify.com/v1/search/'
		var data = {
			q: query,
			type: "playlist"
		};
		
		callSpotify(url, data).then(function(response){
			console.log(response);
            console.log(response.playlists.items)
            displayPlaylists(response);
		})


	});


    $("#picInputFile").on('change', function(){
        previewFile();
        
    })


});