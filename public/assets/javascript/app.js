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
    $('#btnLogin').on('click', function(){
        // OAuthManager.obtainToken({
  //         scopes: [
  //           /*
  //             the permission for reading public playlists is granted
  //             automatically when obtaining an access token through
  //             the user login form
  //             */
  //             'playlist-read-private',
  //             'playlist-read-collaborative',
  //             'playlist-modify-public',
  //             'playlist-modify-private'
  //           ]
  //         }).then(function(token) {
  //           onTokenReceived(token);
  //         }).catch(function(error) {
  //           console.error(error);
  //         });
        loginWithSpotify();
    });


    // $("#picInputFile").on('change', function(){
    //     previewFile();
        
    // })

    $("#filepicker").on('change', function(){
        previewFile(event.fpfile.url);
    })
});