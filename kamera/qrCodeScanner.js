const qrcode2 = window.qrcode;

const video = document.createElement("video");
const audioDiv = document.getElementById('audioDiv');
const btnScanQR = document.getElementById("btn-scan-qr");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

let scanning = false;

// qrcode2.no_longer_a_callback = res => {


//   p  if (res) { // om res �r true finns det ett h�mtat QR-v�rde

//         scanning = false;   
//         video.srcObject.getTracks().forEach(track => {
//             track.stop();
//         });
//         canvasElement.hidden = true;
//         btnScanQR.hidden = false;
   

//         $.ajax({    // ajax hade en bra funktion f�r att kolla om en fil finns i en mapp  
//             url: res+".mp4",
//             type: 'HEAD',
//             error: function () { // ingen fil hittades med QR-texten, den har skannat fel
//                 audioDiv.innerHTML = "";
//                 alert("error: " +res);
//             },
//             success: function () {  // tjoho! Pumpa ut html-kod med audiofilen och en playknapp
//                 // alert("Fungerar");

               

//                 audioDiv.innerHTML ="<div class='audioWrapper'>" +
//                                         "<audio controls id = 'myAudio' > " +
//                                             "<source src = '"+res+".mp4' type = 'audio/wav'>" +
//                                         "</audio >" +
//                                         "<button class='playBtn' onclick = 'playAudio()'> KOMIGEENDAAAA </button>" +
//                                     "</div>";
                                   
                                  
//             }
//         });
//   }

// };

window.scanQRCode = function(callback) {
  window.qrcode.callback = callback;
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;

      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}
function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}
