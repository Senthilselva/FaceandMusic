$(document).ready(function(){
//apiKey: Replace this with your own Project Oxford Emotion API key, please do not use my key. I include it here so you can get up and running quickly but you can get your own key for free at https://www.projectoxford.ai/emotion 
 var apiKey = "2249a05a078e4e21877833c9a7409778";
 
 //apiUrl: The base URL for the API. Find out what this is for other APIs via the API documentation
 var apiUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";

 var file = '{"url": "http://weknowyourdreams.com/images/face/face-01.jpg"}'
 
 $('#btn').click(function () {
 //file: The file that will be sent to the api
 // var file = document.getElementById('filename').files[0];

 CallEmotive(file, apiUrl, apiKey);
 });
 
 function CallEmotive(fileURL, apiUrl, apiKey)
 {
    $.ajax({
     url: apiUrl,
     beforeSend: function (xhrObj) {
     xhrObj.setRequestHeader("Content-Type", "application/json");
     xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
     },
     type: "POST",
     data: fileURL,
     processData: false
    })
    .done(function (response) {
    ProcessResult(response);
    })
    .fail(function (error) {
    alert("fail")
    
    });
  }
 
 function ProcessResult(response)
 {
 console.log(response)
 
 }
 
})






