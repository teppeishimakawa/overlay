
//var colorDistance=10;
//var seido=4;


var wid=window.innerWidth;
var hei=window.innerHeight;

var rectX=0;
var rectY=0;
var rectWid=1280;
var rectHei=720;

var seido=8;




//input video
var canvas = document.getElementById('canvas');
    canvas.width=wid;
    canvas.height=hei;
    // そのまま表示すると鏡像にならないので反転させておく
    //canvas.style.transform = 'rotateY(180deg)';
    document.getElementById("video").style.visibility="visible"
    document.getElementById("plane").style.display="none"
    canvas.style.visibility="visible"
    //autoplayを外し、playを入れたらcanvasに描がかれた
    document.getElementById('plane').play();
    document.getElementById('video').play();

var context = canvas.getContext('2d');



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
  draw();
 };

function errorCallback(err) {
  alert(err);
 };

}else
{

}

    // planeの映像をcanvasに描画する
    function draw()
    {
        context.clearRect(0, 0, wid, hei);
        context.drawImage(plane,rectX,rectY,rectWid,rectHei,rectX,rectY,rectWid,rectHei);
        detect();
        requestAnimationFrame(draw);
    };


    // 検出処理
    function detect()
    {
        console.log("detect");
        var imageData = context.getImageData(rectX,rectY,rectWid,rectHei);
        data = imageData.data;
        // dataはUint8ClampedArray
        // 長さはcanvasの width * height * 4(r,g,b,a)
        // 先頭から、一番左上のピクセルのr,g,b,aの値が順に入っており、
        // 右隣のピクセルのr,g,b,aの値が続く
        // n から n+4 までが1つのピクセルの情報となる


        for (var i=0; i < data.length; i += seido)
         　{
            var target =
            　　{
                    r: data[i],
                    g: data[i + 1],
                    b: data[i + 2]
                };
            var black =
            　　{
                    r: 0,
                    g: 0,
                    b: 0
                };

            //blackは消す
            if (target == black)
              {
              data[i + 3] = 0;
              }
            else
              {
              return;
              }
              console.log("detect");
        　 }

console.log(target);


    }






