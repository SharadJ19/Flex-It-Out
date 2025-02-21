const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 480;

// Get Camera Access
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
}).catch(err => console.error("Error accessing camera:", err));

//  Load MediaPipe Pose Model
const pose = new Pose({
    locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
});
pose.setOptions({
    modelComplexity: 1, // Higher = more accurate
    smoothLandmarks: true,
    enableSegmentation: false,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

//  Process Video Feed
const camera = new Camera(video, {
    onFrame: async () => {
        await pose.send({ image: video });
    },
    width: 640,
    height: 480
});
camera.start();

// Draw Detected Landmarks
pose.onResults(results => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    if (results.poseLandmarks) {
        drawLandmarks(ctx, results.poseLandmarks, { color: "yellow", lineWidth: 2 });
    }
});