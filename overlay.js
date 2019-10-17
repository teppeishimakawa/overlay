

var width=window.innerWidth;
var height=window.innerHeight;
var buffer=document.getElementById("buffer").getContext('2d');

document.getElementById("video").play();
document.getElementById("bgvideo").play();

function draw() {
    buffer.drawImage(video, 0, 0);

    //Get alphadata
    var image = buffer.getImageData(0, 0, width, height);
    var imageData = image.data;
    var alphaData = buffer.getImageData(0, 0, width, height).data;
    //var alphaData = buffer.getImageData(0, height, width, height).data;

    //Loop through pixels, replace data with alpha channel
    //映像のアルファはアルファ動画のbチャンネルの値で決める。（白黒なのでr=g=bだから）
    for (i = 3; i < imageData.length; i += 4)
    {
        imageData[i] = alphaData[i-1];
    }

    //Output to second canvas
    document.getElementById("output").getContext("2d").putImageData(image, 0, 0, 0, 0, width, height);
    requestAnimationFrame(draw)
}


draw();



const medias =
{
  audio: false,
  video: {
    facingMode: "environment"
    //aspectRatio: {exact: 1.7777777778}
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
  bgvideo.srcObject = stream;
 };

function errorCallback(err) {
  alert(err);
 };

}else
{

}

