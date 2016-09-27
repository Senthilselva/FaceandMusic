$(document).ready(function() {
	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDz9GC105fz2aqAqcqVw-Fg-2SS-N4_8JA",
    authDomain: "senthilproject-ae6ac.firebaseapp.com",
    databaseURL: "https://senthilproject-ae6ac.firebaseio.com",
    storageBucket: "senthilproject-ae6ac.appspot.com",
    messagingSenderId: "32686972649"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref();

const auth =firebase.auth();
const storage = firebase.storage();
var storageref= storage.ref();

$("#btnSignup").on('click',function(){
	var emailV=$("#txtEmail").val();
	var passwordV = $("#txtPassword").val();
	const promise = auth.createUserWithEmailAndPassword(emailV,passwordV)
	promise.catch(e => console.log(e.message));
});

$("#btnLogin").on('click',function(){
	var emailV=$("#txtEmail").val();
	var passwordV = $("#txtPassword").val();
	const promise = auth.signInWithEmailAndPassword(emailV,passwordV)
	promise.then(user => console.log(user))
	//promise.catch(e => console.log(e.message));
});


firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			console.log(firebaseUser);
		} else {
			console.log("not logged in");
		}
});//Closing OnAuthSateChanged

$("#btnLogout").on('click',function(){
	firebase.auth().signOut();
});
	

$("#filename").on('change',previewFile);
////Display on page
function previewFile() {
	//console.log("preview")
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();
  console.log(file);

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if(file){
   reader.readAsDataURL(file);
    //uploading to firebase
 	storageref.child("senthil/"+file.name).put(file);
 
  }
}

$("#btnUpload").on("click",downLoadFile);

function downLoadFile(){

var picname="technics.jpg"
  storageref.child("senthil/"+picname).getDownloadURL().then(function(url) {
console.log("downloading");
    var uploadImg = document.querySelector('img');
    uploadImg.src=url; });

}


});
