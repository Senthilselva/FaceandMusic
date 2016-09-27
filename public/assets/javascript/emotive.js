
//apiKey: Replace this with your own Project Oxford Emotion API key, please do not use my key. I include it here so you can get up and running quickly but you can get your own key for free at https://www.projectoxford.ai/emotion 
 var apiKey = "2249a05a078e4e21877833c9a7409778";
 
 //apiUrl: The base URL for the API. Find out what this is for other APIs via the API documentation
 var apiUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";

 var file = '{"url": "https://firebasestorage.googleapis.com/v0/b/senthilproject-ae6ac.appspot.com/o/senthil%2Fface-01.jpg?alt=media&token=6fbc08b6-3767-42db-8744-5fefdbe00036"}'
 
 
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








