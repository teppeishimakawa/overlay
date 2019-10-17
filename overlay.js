
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
var canvas_alpha = document.getElementById('canvas_alpha');
    canvas_alpha.width=wid;
    canvas_alpha.height=hei;
    // そのまま表示すると鏡像にならないので反転させておく
    //canvas.style.transform = 'rotateY(180deg)';
    document.getElementById("video").style.visibility="visible"
    document.getElementById("plane").style.display="none"
    document.getElementById("plane_alpha").style.display="none"
    canvas.style.visibility="visible"
    canvas_alpha.style.display="none"
    //autoplayを外し、playを入れたらcanvasに描がかれた
    document.getElementById('plane').play();
    document.getElementById('plane_alpha').play();
    document.getElementById('video').play();

var context = canvas.getContext('2d');
var context_alpha = canvas_alpha.getContext('2d');


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
        context_alpha.clearRect(0, 0, wid, hei);
        context_alpha.drawImage(plane_alpha,rectX,rectY,rectWid,rectHei,rectX,rectY,rectWid,rectHei);
        detect();
        requestAnimationFrame(draw);
    };


    // 検出処理
    function detect()
    {
        var imageData = context.getImageData(rectX,rectY,rectWid,rectHei);
        data = imageData.data;
        var imageData2 = context_alpha.getImageData(rectX,rectY,rectWid,rectHei);
        data2 = imageData2.data;
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
            var back =
            　　{
                    r: data2[i],
                    g: data2[i + 1],
                    b: data2[i + 2]
                };
                console.log(target);
                console.log(back);
            //blackは消す
            if (back.r  == 0 && back.g == 0 && back.b == 0)
              {
              data[i + 3] = 0;
              }
            else
              {
              return;
              }

        　 }
context.putImageData(imageData,xx,yy);


    }








