/*exported OAuthConfig*/

var OAuthConfig = (function() {
  'use strict';

  var clientId = 'c06624947f124dcbb0d4375eb2336a40';
  var redirectUri;
  if (location.host === 'localhost:8005') {
    redirectUri = 'http://localhost:8005/callback.html';
  } else {
    redirectUri = 'https://spotifyapp-564b4.firebaseapp.com/spotifytest.html';
  }
  var host = /http[s]?:\/\/[^/]+/.exec(redirectUri)[0];
  return {
    clientId: clientId,
    redirectUri: redirectUri,
    host: host
  };
})();
