

var state = {
    story: {
        loaded: false,
        data: {}
    },
    user: {
        showCamera: false,
        showQRScanner: false,
        audiosource: false
    },
    showQRScanner: function () {
        QRScannerStart();
        this.user.showQRScanner = true;
    },

    showCamera: function () {
        cameraStart();
        this.user.showCamera = true;
    },
    audiosource: function(){
        playAudio();
        this.user.audiosource = true;
    }

};

console.log("START: ");
console.log(state);

// // QR SCANNER FUNCTION
// @TODO : fix.
function QRScannerStart() {
    console.log("QR-scanner start " + state);
    console.log(state);

    var resultContainer = document.getElementById('qr-reader-results');
    var lastResult, countResults = 0;
    
    function onScanSuccess(qrCodeMessage) {
        if (qrCodeMessage !== lastResult) {
            ++countResults;
            lastResult = qrCodeMessage;
            resultContainer.innerHTML 
                += `<div>[${countResults}] - ${qrCodeMessage}</div>`;
        }
    }
    
    var html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);
   
}

// // // // // // // // // 
// // CAMERA FUNCTION
// Access the device camera and stream to cameraView
function cameraStart() {
    console.log("camera start! ");
    console.log(state);

    // Set constraints for the video stream
    var constraints = { video: { facingMode: "environment" }, audio: false };

    // Define constants
    const cameraView = document.querySelector("#camera--view"),
        cameraOutput = document.querySelector("#camera--output"),
        cameraSensor = document.querySelector("#camera--sensor"),
        cameraTrigger = document.querySelector("#camera--trigger")

    // Take a picture when cameraTrigger is tapped
    cameraTrigger.onclick = function() {
        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        cameraOutput.src = cameraSensor.toDataURL("image/webp");
        cameraOutput.classList.add("taken");

        state.story.loaded = true;
        state.story.data.title = "test titel laddad";
    };

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}




var play = false;

function playAudio() {
           
        var x = document.getElementById("myAudio");    

        if (play === false) {
            play = true;
            x.play();
            document.getElementById("playPause").innerHTML = "Pause Audio";
        } else {
            play = false;
            x.pause();
            document.getElementById("playPause").innerHTML = "Play Audio";
            }
}







function showWindow() {
    if (document.getElementById("camera--output").style.visibility === "visible") {
        alert("CLICKI-TAKE-A-PIC!");
    }
  
    document.getElementById("camera--output").style.visibility = "visible";
}

function setStoryTrue() {

 

    state.story.loaded = true;
    state.story.data =  {title: "test titel laddad"};
}

window.state = state;