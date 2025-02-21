import { useEffect, useRef, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { drawLandmarks } from '@mediapipe/drawing_utils';

const WorkoutTracker = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [squatCount, setSquatCount] = useState(0);
  const isSquattingRef = useRef(false);
  const lastSquatTimeRef = useRef(0);

  const calculateAngle = (a: any, b: any, c: any) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  };

  const detectSquats = (landmarks: any) => {
    const hip = landmarks[24];
    const knee = landmarks[26];
    const ankle = landmarks[28];

    if (hip && knee && ankle) {
      const kneeAngle = calculateAngle(hip, knee, ankle);
      const currentTime = Date.now();

      if (kneeAngle < 90) {
        if (!isSquattingRef.current) {
          isSquattingRef.current = true;
        }
      } else if (isSquattingRef.current && kneeAngle > 160) {
        if (currentTime - lastSquatTimeRef.current > 800) {
          isSquattingRef.current = false;
          setSquatCount(prev => prev + 1);
          lastSquatTimeRef.current = currentTime;
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
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults((results) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (results.poseLandmarks) {
        drawLandmarks(ctx, results.poseLandmarks, { color: "yellow", lineWidth: 2 });
        detectSquats(results.poseLandmarks);
      }
    });

    const camera = new Camera(video, {
      onFrame: async () => {
        await pose.send({ image: video });
      },
      width: 640,
      height: 480
    });

    navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480, facingMode: "user" }
    }).then((stream) => {
      video.srcObject = stream;
      camera.start();
    });

    return () => {
      camera.stop();
      if (video.srcObject instanceof MediaStream) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Squats: {squatCount}</h2>
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

export default WorkoutTracker;