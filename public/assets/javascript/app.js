var credentials = null;

$(document).ready(function() {


	console.log("document ready");

	checkAuthorization();

    // function to search spotify api for playlists
    $('#btnLogin').on('click', function(){
        loginWithSpotify();
    });

    $("#filepicker").on('change', function(){
        previewFile(event.fpfile.url);
    })

    $('#spotify').on('click', function(){
      loginWithSpotify();
    })
});