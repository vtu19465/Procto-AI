import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import './VideoMonitoring.css'; // Import the CSS file for styles

const VideoMonitoring = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [alertTriggered, setAlertTriggered] = useState(false); // State to track alerts
  const [faceNotDetectedCount, setFaceNotDetectedCount] = useState(0); // Count for face detection
  const [suspiciousActivityCount, setSuspiciousActivityCount] = useState(0); // Count for suspicious activities

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

      let suspiciousActivityDetected = false; // Flag for suspicious activity
      let faceDetected = false; // Flag for face detection

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

        // Define suspicious activities (you can modify this based on your needs)
        const suspiciousItems = ['cell phone', 'laptop', 'tablet'];
        if (suspiciousItems.includes(prediction.class) && prediction.score > 0.5) {
          suspiciousActivityDetected = true; // Set the flag if a suspicious item is detected
        }

        // Check for person detection
        if (prediction.class === 'person' && prediction.score >= 0.5) {
          faceDetected = true; // Set the flag if a person is detected with sufficient confidence
        }
      });

      // Trigger alert if suspicious activity is detected and not already triggered
      if (suspiciousActivityDetected && !alertTriggered) {
        setAlertTriggered(true); // Set alert triggered state
        setSuspiciousActivityCount((prevCount) => prevCount + 1); // Increment suspicious activity count
        alert('Suspicious activity detected! Please remove unauthorized items.'); // Show alert
      } else if (!suspiciousActivityDetected) {
        setAlertTriggered(false); // Reset alert state if no suspicious activity
      }

      // Check for face detection
      if (!faceDetected) {
        setFaceNotDetectedCount((prevCount) => prevCount + 1); // Increment face not detected count
        alert('Face is not detected! Please ensure your face is visible.'); // Show alert for face detection
      } else {
        setFaceNotDetectedCount(0); // Reset if face is detected
      }

      // Auto-submit assessment if conditions are met
      if (suspiciousActivityCount >= 5 && faceNotDetectedCount >= 5) {
        autoSubmitAssessment(); // Call your auto-submit function
      }
    }
  };

  // Function to handle automatic submission of the assessment
  const autoSubmitAssessment = () => {
    alert('Auto-submitting assessment due to repeated issues.'); // Alert before submission
    // Your logic to submit the assessment goes here
    // For example, you might call a submit function or redirect to a submission page
  };

  useEffect(() => {
    const intervalId = setInterval(detectObjects, 100); // Run detection every 100ms
    return () => clearInterval(intervalId);
  }, [model]);

  return (
    <div className="video-monitoring">
      <h3>Video Monitoring</h3>
      <video ref={videoRef} width="320" height="240" autoPlay muted />
      <canvas ref={canvasRef} width="320" height="240" style={{ position: 'absolute', top: 0, left: 0 }} />
    </div>
  );
};

export default VideoMonitoring;
