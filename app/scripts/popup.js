'use strict';

var $message = $("#message")

navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;
var capturedImageURL = "";

var sayuriSocket = new WebSocket("ws://localhost/sayurisocket");
sayuriSocket.onopen = function() {
   console.log("connected to sayuri");
};
sayuriSocket.onmessage = function (event) {
    var data = JSON.parse(event.data)
    snapshot();
};

function snapshot() {
    if (localMediaStream) {
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
        ctx.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
        capturedImageURL = canvas.toDataURL("image/png");
        document.querySelector('img').src = capturedImageURL;
        sendSnapShot(capturedImageURL);
    }
}

function sendSnapShot(dataUrl){
    /*
    $.ajax({
        type: "POST",
        url: FACE_API,
        dataType: "json",
        data: {"face": dataUrl}
    })
    .done(function(){
        console.log("send face image");
    })
    .fail(function(){
        console.log("failed");
    })*/
    var data = JSON.stringify({"face": dataUrl});
    sayuriSocket.send(data);
}

navigator.getUserMedia({video: true}, function(stream) {
    $message.text("Push capture button to take snapshot.");
    $message.addClass("enabled");

    video.src = window.URL.createObjectURL(stream);
    video.play();
    localMediaStream = stream;
}, function(){
    $message.text("failed. please access option page.");
    $message.addClass("disabled");
});

video.addEventListener('click', function(){
    if(video.paused){
        video.play();    
    }else{
        video.pause();
    }
}, false);

$("#capture").click(function(){
    snapshot();
})

