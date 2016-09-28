$(document).ready(function() {
	var login = 0;

	console.log("page ready");
	$(".loginSignupSection").hide();
	$(".playlistShow").hide();

	$(".btnSpotifyLogin").on('click', function(){
		console.log("Hello world");
		loginWithSpotify();
		login = 1;
		loginSpotifyCheck();
	});

	function loginSpotifyCheck(){
		if(login == 1){
			alert("Error");
			$(".SpotifyLogin").hide();
			
		}else{
			$(".playlistShow").show();
			$(".SpotifyLogin").hide();
		}	
	}
});