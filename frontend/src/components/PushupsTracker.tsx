import { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawLandmarks } from "@mediapipe/drawing_utils";

const PushupsTracker = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pushupCount, setPushupCount] = useState(0);
  const isLoweredRef = useRef(false);
  const lastPushupTimeRef = useRef(0);

  // ✅ Function to calculate joint angles
  const calculateAngle = (a: any, b: any, c: any) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  };

  // ✅ Detect push-ups using arm angles
  const detectPushups = (landmarks: any) => {
    const shoulder = landmarks[12]; // Right Shoulder
    const elbow = landmarks[14]; // Right Elbow
    const wrist = landmarks[16]; // Right Wrist

    if (shoulder && elbow && wrist) {
      const elbowAngle = calculateAngle(shoulder, elbow, wrist);
      const currentTime = Date.now();

      if (elbowAngle < 90) { // Down position detected
        if (!isLoweredRef.current) {
          isLoweredRef.current = true;
        }
      } else if (isLoweredRef.current && elbowAngle > 160) { // Up position detected
        if (currentTime - lastPushupTimeRef.current > 800) {
          isLoweredRef.current = false;
          setPushupCount((prev) => prev + 1);
          lastPushupTimeRef.current = currentTime;
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
        detectPushups(results.poseLandmarks);
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
      <h2 className="text-2xl font-bold">Push-ups: {pushupCount}</h2>
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

export default PushupsTracker;
