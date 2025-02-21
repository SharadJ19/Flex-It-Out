import { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawLandmarks } from "@mediapipe/drawing_utils";

const CrunchesTracker = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [crunchCount, setCrunchCount] = useState(0);
  const isCrunchingRef = useRef(false);
  const lastCrunchTimeRef = useRef(0);

  // ✅ Function to calculate joint angles
  const calculateAngle = (a: any, b: any, c: any) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  };

  // ✅ Detect crunches using torso angle
  const detectCrunches = (landmarks: any) => {
    const shoulder = landmarks[12]; // Right Shoulder
    const hip = landmarks[24]; // Right Hip
    const knee = landmarks[26]; // Right Knee

    if (shoulder && hip && knee) {
      const torsoAngle = calculateAngle(shoulder, hip, knee);
      const currentTime = Date.now();

      if (torsoAngle < 60) { // When body curls forward
        if (!isCrunchingRef.current) {
          isCrunchingRef.current = true;
        }
      } else if (isCrunchingRef.current && torsoAngle > 120) { // When body extends back
        if (currentTime - lastCrunchTimeRef.current > 800) {
          isCrunchingRef.current = false;
          setCrunchCount((prev) => prev + 1);
          lastCrunchTimeRef.current = currentTime;
        }
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = 640;
    canvas.height = 480;

    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (results.poseLandmarks) {
        drawLandmarks(ctx, results.poseLandmarks, { color: "yellow", lineWidth: 2 });
        detectCrunches(results.poseLandmarks);
      }
    });

    const camera = new Camera(video, {
      onFrame: async () => {
        await pose.send({ image: video });
      },
      width: 640,
      height: 480,
    });

    navigator.mediaDevices
      .getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      })
      .then((stream) => {
        video.srcObject = stream;
        camera.start();
      });

    return () => {
      camera.stop();
      if (video.srcObject instanceof MediaStream) {
        video.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Crunches: {crunchCount}</h2>
      <div className="relative w-[640px] h-[480px]">
        <video
          ref={videoRef}
          className="absolute top-0 left-0"
          width={640}
          height={480}
          autoPlay
          playsInline
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
          width={640}
          height={480}
        />
      </div>
    </div>
  );
};

export default CrunchesTracker;