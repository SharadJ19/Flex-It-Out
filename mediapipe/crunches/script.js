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

// ✅ Crunch Tracking Variables
let crunchCount = 0;
let isCrunching = false;
let lastCrunchTime = 0;

// ✅ Function to Calculate Joint Angles
function calculateAngle(a, b, c) {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
}

// ✅ Detect Crunches Using Angles
function detectCrunches(landmarks) {
    const shoulder = landmarks[12]; // Right Shoulder
    const hip = landmarks[24]; // Right Hip
    const knee = landmarks[26]; // Right Knee

    if (shoulder && hip && knee) {
        const torsoAngle = calculateAngle(shoulder, hip, knee);
        const currentTime = Date.now();

        if (torsoAngle < 60) { // When body curls forward
            if (!isCrunching) {
                isCrunching = true;
                console.log("Crunch detected!");
            }
        } 
        else if (isCrunching && torsoAngle > 120) { // When body extends back
            if (currentTime - lastCrunchTime > 800) { 
                isCrunching = false;
                crunchCount++;
                lastCrunchTime = currentTime;
                countDisplay.textContent = crunchCount;
                console.log(`Crunch Count: ${crunchCount}`);
            }
        }
    }
}

// ✅ Draw Landmarks and Detect Crunches
function onResults(results) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (results.poseLandmarks) {
        drawLandmarks(ctx, results.poseLandmarks, { color: "yellow", lineWidth: 2 });

        // ✅ Force WebGL to Initialize Textures
        ctx.fillStyle = "rgba(0, 0, 0, 0.01)";
        ctx.fillRect(0, 0, 1, 1);

        detectCrunches(results.poseLandmarks);
    }
}
