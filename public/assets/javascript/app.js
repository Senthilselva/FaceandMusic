var credentials = null;

function getTime() {
    return Math.round(new Date().getTime() / 1000);
}

function checkAuthorization() {
    // if we already have a token and it hasn't expired, use it,
    if ('credentials' in localStorage) {
        credentials = JSON.parse(localStorage.credentials);
    }
    if (credentials && credentials.expires > getTime()) {

    	spotifyApi.setAccessToken(credentials.token);
      
    } else {
    // we have a token as a hash parameter in the url
    // so parse hash
        var hash = location.hash.replace(/#/g, '');
        var all = hash.split('&');
        var args = {};
        all.forEach(function(keyvalue) {
            var idx = keyvalue.indexOf('=');
            var key = keyvalue.substring(0, idx);
            var val = keyvalue.substring(idx + 1);
            args[key] = val;
        });
        if (typeof(args['access_token']) != 'undefined') {
            var g_access_token = args['access_token'];
            var expiresAt = getTime() + 3600;
            if (typeof(args['expires_in']) != 'undefined') {
                var expires = parseInt(args['expires_in']);
                expiresAt = expires + getTime();
            }
            credentials = {
                token:g_access_token,
                expires:expiresAt
            }
            callSpotify('https://api.spotify.com/v1/me').then(
                function(user) {
                    credentials.user_id = user.id;
                    localStorage['credentials'] = JSON.stringify(credentials);
                    location.hash = '';

                },
                function() {
                    error("Can't get user info");
                })

            spotifyApi.setAccessToken(credentials.token);
            ;
        } else {
    // otherwise, go to spotify to get auth
            $(".SpotifyLogin").show();
        }
    }
}

$(document).ready(function() {

	console.log("document ready");

	checkAuthorization();

	// $('#btnSpotifyLogin').on('click', function(){
	// 	loginWithSpotify();
	// });

	$('#btnSearch').on('click', function(){

		var query = $('#search').val().trim();
		var url = 'https://api.spotify.com/v1/search/'
		var data = {
			q: query,
			type: "playlist"
		};
		
		callSpotify(url, data).then(function(response){
			console.log(response);
		})


	});


});