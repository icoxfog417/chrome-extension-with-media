'use strict';
var $status = $("#status")
navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
navigator.getUserMedia({video: true}, function(localMediaStream) {
    $status.text("Enabled!");
    $status.addClass("enabled");
}, function(){
    $status.text("Failed...");
    $status.addClass("disabled");
});
