const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const countDisplay = document.getElementById("count");

canvas.width = 640;
canvas.height = 480;

// ✅ Ensure WebGL 2.0 is properly initialized
const gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true });
if (!gl) {
    console.error("WebGL 2.0 is not supported!");
}

// ✅ Start Camera with Proper Settings
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480, facingMode: "user" }
        });
        video.srcObject = stream;
        console.log("Camera started successfully!");
    } catch (error) {
        console.error("Error accessing camera:", error);
    }
}
startCamera();

// ✅ Preload WebGL Textures on Video Load
video.addEventListener("loadeddata", () => {
    console.log("Camera Ready: Preloading WebGL textures...");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.01)";
    ctx.fillRect(0, 0, 1, 1);
});

// ✅ Correct MediaPipe Pose Model Initialization
const pose = new Pose({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
});

pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
    delegate: "GPU"
});
pose.onResults(onResults);

// ✅ Introduce a Small Delay Before Processing Frames
async function sendVideoFrame() {
    if (!video.paused && !video.ended) {
        await new Promise((resolve) => setTimeout(resolve, 10)); // 🛑 Tiny 10ms delay
        await pose.send({ image: video });
        requestAnimationFrame(sendVideoFrame);
    }
}

// ✅ Correct Camera Initialization
const camera = new Camera(video, {
    onFrame: async () => {
        await sendVideoFrame();
    },
    width: 640,
    height: 480
});
camera.start();

// ✅ Push-up Tracking Variables
let pushupCount = 0;
let isLowered = false;
let lastPushupTime = 0;

// ✅ Function to Calculate Joint Angles
function calculateAngle(a, b, c) {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
}

// ✅ Detect Push-ups Using Arm Angles
function detectPushups(landmarks) {
    const shoulder = landmarks[12]; // Right Shoulder
    const elbow = landmarks[14]; // Right Elbow
    const wrist = landmarks[16]; // Right Wrist

    if (shoulder && elbow && wrist) {
        const elbowAngle = calculateAngle(shoulder, elbow, wrist);
        const currentTime = Date.now();

        if (elbowAngle < 90) { // Detect lowering phase
            if (!isLowered) {
                isLowered = true;
                console.log("Push-up Down Detected!");
            }
        } 
        else if (isLowered && elbowAngle > 160) { // Detect fully extended arms
            if (currentTime - lastPushupTime > 800) { 
                isLowered = false;
                pushupCount++;
                lastPushupTime = currentTime;
                countDisplay.textContent = pushupCount;
                console.log(`Push-up Count: ${pushupCount}`);
            }
        }
    }
}

// ✅ Draw Landmarks and Detect Push-ups
function onResults(results) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (results.poseLandmarks) {
        drawLandmarks(ctx, results.poseLandmarks, { color: "yellow", lineWidth: 2 });

        // ✅ Force WebGL to Initialize Textures
        ctx.fillStyle = "rgba(0, 0, 0, 0.01)";
        ctx.fillRect(0, 0, 1, 1);

        detectPushups(results.poseLandmarks);
    }
}
