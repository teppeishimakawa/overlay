

    video.style.visibility="visible"

    //autoplayを外し、playを入れたらcanvasに描がかれた
    document.getElementById('video').play();


const medias =
{
  audio: false,
  video: {
    facingMode: "environment"
    //facingMode: "user" // フロントカメラにアクセス
  }
};


navigator.mediaDevices = navigator.mediaDevices ||
((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
   getUserMedia: function(c) {
     return new Promise(function(y, n) {
       (navigator.mozGetUserMedia ||
        navigator.webkitGetUserMedia).call(navigator, c, y, n);
     });
   }
} : null
);



if(navigator.mediaDevices)
{


const promise = navigator.mediaDevices.getUserMedia(medias);

promise.then(successCallback)
       .catch(errorCallback);


function successCallback(stream) {
  video.srcObject = stream;
 };

function errorCallback(err) {
  alert(err);
 };

}else
{

}

