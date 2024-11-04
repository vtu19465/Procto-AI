import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import './VideoMonitoring.css';

const VideoMonitoring = ({ onAutoSubmit }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [faceNotDetectedCount, setFaceNotDetectedCount] = useState(0);
  const [suspiciousActivityCount, setSuspiciousActivityCount] = useState(0);

  useEffect(() => {
    const loadModel = async () => {
      const cocoModel = await cocoSsd.load();
      setModel(cocoModel);
    };

    loadModel();

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((err) => console.error("Error accessing webcam:", err));
    }
  }, []);

  const detectObjects = async () => {
    if (model && videoRef.current && canvasRef.current) {
      const predictions = await model.detect(videoRef.current);
      const context = canvasRef.current.getContext('2d');
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      let suspiciousActivityDetected = false;
      let faceDetected = false;

      predictions.forEach((prediction) => {
        context.beginPath();
        context.rect(
          prediction.bbox[0],
          prediction.bbox[1],
          prediction.bbox[2],
          prediction.bbox[3]
        );
        context.lineWidth = 2;
        context.strokeStyle = 'red';
        context.fillStyle = 'red';
        context.stroke();
        context.fillText(
          `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
          prediction.bbox[0],
          prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10
        );

        const suspiciousItems = ['cell phone', 'laptop', 'tablet'];
        if (suspiciousItems.includes(prediction.class) && prediction.score > 0.5) {
          suspiciousActivityDetected = true;
        }

        if (prediction.class === 'person' && prediction.score >= 0.5) {
          faceDetected = true;
        }
      });

      if (suspiciousActivityDetected && !alertTriggered) {
        setAlertTriggered(true);
        setSuspiciousActivityCount((prevCount) => prevCount + 1);
        alert("Suspicious activity detected. Please focus on your assessment.");

        if (suspiciousActivityCount + 1 >= 3) {
          alert("Suspicious activity threshold reached. Auto-submitting assessment.");
          onAutoSubmit();
        }
      }

      if (!faceDetected) {
        setFaceNotDetectedCount((prevCount) => prevCount + 1);

        if (faceNotDetectedCount + 1 >= 3) {
          alert("Face not detected multiple times. Auto-submitting assessment.");
          onAutoSubmit();
        }
      } else {
        setFaceNotDetectedCount(0);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(detectObjects, 500);
    return () => clearInterval(intervalId);
  }, [model, alertTriggered, faceNotDetectedCount, suspiciousActivityCount]);

  return (
    <div className="video-monitoring">
      <h3>Video Monitoring</h3>
      <video ref={videoRef} width="240" height="180" autoPlay muted className="video-stream" />
      <canvas ref={canvasRef} width="240" height="180" className="overlay-canvas" />
    </div>
  );
};

export default VideoMonitoring;
