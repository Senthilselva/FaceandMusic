
// filepicker.setKey("AQJ6QdJrISSSWI7qBzBDCz");
  // Initialize Firebase


  
	// Initialize Firebase

  var config = {
    apiKey: "AIzaSyDz9GC105fz2aqAqcqVw-Fg-2SS-N4_8JA",
    authDomain: "senthilproject-ae6ac.firebaseapp.com",
    databaseURL: "https://senthilproject-ae6ac.firebaseio.com",
    storageBucket: "senthilproject-ae6ac.appspot.com",
    messagingSenderId: "32686972649"
  };
  firebase.initializeApp(config);
//Global Variable
var gvUser={};
//Show the login page

$('#mainPage').hide();
$('#LoginAndSignUP').show();

// $('#mainPage').hide();
// $('#LoginAndSignUP').show();
$('#LoginAndSignUP').hide();

//------Database Reference
var database = firebase.database();
var ref = database.ref();

//------Authentication Reference
const auth =firebase.auth();

//------Storage Reference
const storage = firebase.storage();
var storageref= storage.ref();


//----------------filepicker Api
filepicker.setKey('AGNvnt3JRSivjclBDat2Ez');


$(document).ready(function() {


//--------Signing up for a account
$("#btnSignup").on('click',function(){

	var emailV=$("#txtSignUpEmail").val();
  if(!checkEmail(emailV)){
    return false;
  }
	var passwordV = $("#txtSignUpPassword").val();
  if(!checkPassword(passwordV)){
    return false;
  }

  //Create a account
	const promise = auth.createUserWithEmailAndPassword(emailV,passwordV);

  // catch an error and display it document
	promise.catch(e => 
    $("#errMsgSignUp").html(e.message));

  //Add the user to the database
  promise.then(user => addToDatabase(user));
});

//------------Validating email-id
function checkEmail(email){
  if (typeof(email) == 'undefined' || email==null) {
    $("#errMsgSignUp").html("Enter an email-id");
    return false;
  }
  var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
      $("#errMsgSignUp").html("Please enter valid email-id- eg abc@efg.com");
      return false;
    } 
    return true;
}

//-----------------validate Pasword
function checkPassword(password){
  if (typeof(password) == 'undefined' || password==null) {
 
    $("#errMsgSignUp").html("Enter password");
    return false;
  }
  if(password.length >= 6){
    return true;
  } else {
    $("#errMsgSignUp").html("Password should have atleast 6 letters");
    return false;
  }
}

//------------------Create a new object for this user ------
function addToDatabase(user){
  console.log(user);
  console.log(user.email);
  var memberV={};
  memberV.name = $("#txtSignUpName").val();
  memberV.email = user.email;
  database.ref('Members').push(memberV);
  getUserInfo(user);
}


//----------Get user from the Login -----
//----------------------------------------

$("#btnLogin").on('click',function(){
	var emailV=$("#txtEmail").val();
  if(!checkEmail(emailV)){
    return false;
  }
  var passwordV = $("#txtPassword").val();
  if(!checkPassword(passwordV)){
    return false;
  }

  //sign in with the user
	const promise = auth.signInWithEmailAndPassword(emailV,passwordV)
	promise.then(user => getUserInfo(user));
  promise.catch(e => 
    $("#errMsgSignUp").html(e.message));
});

//-------get User info from database--------
function getUserInfo(user){
  database.ref('Members').orderByChild("email").equalTo(user.email).once('value',function(snapshot){
    //console.log("snapshot "+ JSON.stringify(snapshot.val()));
    snapshot.forEach(function(data) {
      var nameV = changetoCapitol(data.val().name);
      $('.usernameDisplay').html(nameV);
        console.log("Name: "+ data.val().name);
        console.log("email: "+ data.val().email);
        gvUser.email=data.val().email;
        gvUser.name=data.val().name;
        gvUser.key=data.key;
        console.log("key "+gvUser.key);
        $('#storedImages').empty();

        if(data.child("Picture").exists()){
          console.log("picture");
          data.child("Picture").forEach(function(picPath) {
  
          //Create image tag and add to the screen 
          var imgTab = $('<img>');
          imgTab.addClass('picture');
          imgTab.attr('src',picPath.val().picUrl);
          imgTab.attr('data-url',picPath.val().picUrl);
          $("#storedImages").append(imgTab);
            console.log(picPath.val().picUrl);

          });
        }//if picture exists
    }); //looping through the snapshot  

  });//database query

}//getUserInfo

// $("#btnLogin").on('click',function(){
// 	var emailV=$("#txtEmail").val();
//   if(!checkEmail(emailV)){
//     return false;
//   }
//   var passwordV = $("#txtPassword").val();
//   if(!checkPassword(passwordV)){
//     return false;
//   }

//   //sign in with the user
// 	const promise = auth.signInWithEmailAndPassword(emailV,passwordV)
// 	promise.then(user => getUserInfo(user));
//   promise.catch(e => 
//     $("#errMsgSignUp").html(e.message));
// });

// //-------get User info from database--------
// function getUserInfo(user){
//   database.ref('Members').orderByChild("email").equalTo(user.email).once('value',function(snapshot){
// //    console.log("snapshot "+ JSON.stringify(snapshot.val()));
//     snapshot.forEach(function(data) {
//       var nameV = changetoCapitol(data.val().name);
//       $('.usernameDisplay').html(nameV);
//         console.log("Name: "+ data.val().name);
//         console.log("email: "+ data.val().email);
//         gvUser.email=data.val().email;
//         gvUser.name=data.val().name;
//         gvUser.key=data.key;
//         console.log("key "+gvUser.key);
//         if(data.child("Picture").exists()){
//           console.log("picture");
//           data.child("Picture").forEach(function(picPath) {
//             console.log(picPath.val());
//             });
//         }//if picture exists
//     }); //looping through the snapshot  

//   });//database query

// }//getUserInfo


//change the first letter after space to capital
function changetoCapitol(pharse){
  pharse= pharse.split(" ");
  for (var i=0; i < pharse.length; i++){
  //console.log(pharse[i][0].toUpperCase());
    pharse[i] = pharse[i].split("");
    pharse[i][0] = pharse[i][0].toUpperCase();
    pharse[i] = pharse[i].join("");
  }
  pharse=pharse.join(" ");
  return pharse;
}


//Show and hide the login and 
firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
      $('#mainPage').show();
      $('#LoginAndSignUP').hide();
      getUserInfo(firebaseUser);
     // location.reload();
			console.log(firebaseUser);
		} else {
      gvEmail="";
      $('#mainPage').hide();
      $('#LoginAndSignUP').show();
     // location.reload();
			console.log("not logged in");
		}
});//Closing OnAuthSateChanged

//Log out 
$("#btnLogout").on('click',function(){
	firebase.auth().signOut();
  location.reload();
});
	

//$("#picInputFile").on('change',previewFile);

////Display on page


$("#storedImages").on("click",'.picture', function(e){
  downLoadFile(e)
});

function downLoadFile(e){
var url =$(e.target).data("url");
//Call emotive here/////////////////
callEmotive(url, apiUrl, apiKey);

// //Show and hide the login and 
// firebase.auth().onAuthStateChanged(firebaseUser => {
// 		if(firebaseUser){
//       $('#mainPage').show();
//       $('#LoginAndSignUP').hide();
//       getUserInfo(firebaseUser);
// 			console.log(firebaseUser);
// 		} else {
//       gvEmail="";
//       $('#mainPage').hide();
//       $('#LoginAndSignUP').show();
// 			console.log("not logged in");
// 		}
// });//Closing OnAuthSateChanged

// $("#btnLogout").on('click',function(){
// 	firebase.auth().signOut();
//   location.reload();
// });
	



$("#btnUpload").on("click",downLoadFile);

function downLoadFile(){

var picname="technics.jpg"
  storageref.child("senthil/"+picname).getDownloadURL().then(function(url) {
console.log("downloading"+ url);
    
    var uploadImg = document.querySelector('img');
    uploadImg.src=url;
    
    emotive(newfile);

  });

  
}

/////emotive stuff





function previewFile(url) {
  var preview = $('.uploadImage');
  preview.attr('src',url);
  preview.attr('data-url',url);
  database.ref("Members").child(gvUser.key+"/Picture").push({"picUrl": url});
  console.log(url);
  //Call emotive here/////////////////
  callEmotive(url, apiUrl, apiKey);
}



 // $('#btn').click(function () {
 // //file: The file that will be sent to the api
 // var file = document.getElementById('filename').files[0];
 
 // emotiveAPI(file, apiUrl, apiKey);
 // });
 
 // function emotive(file){
 //  console.log("hahaha");
 // }

 ////Display on page
function previewFile() {
    //console.log("preview")
  var preview = $('.uploadImage');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();
  console.log(file);

  reader.addEventListener("load", function () {
    preview.attr('src',reader.result);
  }, false);

  if(file){
   reader.readAsDataURL(file);
    //uploading to firebase storage
    storageref.child(gvUser.email+"/"+file.name).put(file);
  console.log(gvUser.email+"/"+file.name);
  console.log(gvUser.key);
  //saving it to the database
  database.ref("Members").child(gvUser.key+"/Picture").push({pic: gvUser.email+"/"+file.name});
  callEmotive(file,apiUrl,apiKey);
  }
}
 

