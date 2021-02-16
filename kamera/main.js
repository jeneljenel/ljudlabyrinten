var state = {
    story: {
        loaded: false,
        data: {}
    },
    user: {
        showQRScanner: false
    },
    showQRScanner: function () {
        cameraStart();
        this.user.showQRScanner = true;
    }
};

// Access the device camera and stream to cameraView
function cameraStart() {
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

function showWindow() {
    if (document.getElementById("camera--output").style.visibility === "visible") {
        alert("CLICKI-TAKE-A-PIC!");
    }
  
    document.getElementById("camera--output").style.visibility = "visible";
}
window.state = state;