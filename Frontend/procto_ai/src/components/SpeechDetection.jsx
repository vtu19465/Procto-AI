// src/components/SpeechDetection.jsx
import React, { useEffect, useState } from 'react';

const SpeechDetection = ({ onAutoSubmit }) => {
  const [isMicActive, setIsMicActive] = useState(false);
  const [speechDetected, setSpeechDetected] = useState(false);
  const [speechCount, setSpeechCount] = useState(0);
  const [submitted, setSubmitted] = useState(false); // State to track if already submitted

  // Set a higher threshold to reduce sensitivity
  const volumeThreshold = 20.0; // Increase this to make it less sensitive to minor sounds
  const detectionInterval = 1000; // Time in milliseconds between consecutive detections

  useEffect(() => {
    let audioContext;
    let analyser;
    let microphone;
    let javascriptNode;
    let lastDetectionTime = 0; // Variable to track last detection time

    const startSpeechDetection = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 2048;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);

        javascriptNode.onaudioprocess = () => {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          const volume = array.reduce((a, b) => a + b) / array.length;

          const currentTime = Date.now();

          if (volume > volumeThreshold && currentTime - lastDetectionTime > detectionInterval) {
            setSpeechDetected(true);
            setSpeechCount((prevCount) => prevCount + 1);
            lastDetectionTime = currentTime; // Update the last detection time
          } else {
            setSpeechDetected(false);
          }
        };

        setIsMicActive(true);
      } catch (err) {
        console.error('Microphone access denied:', err);
      }
    };

    startSpeechDetection();

    return () => {
      if (microphone) microphone.disconnect();
      if (javascriptNode) javascriptNode.disconnect();
      if (audioContext) audioContext.close();
    };
  }, []);

  useEffect(() => {
    // Show warning if speech detected more than four times and not yet submitted
    if (!submitted && speechCount > 4) {
      alert("Warning: Please keep quiet during the assessment.");
    }

    // Trigger auto-submit if speech detected more than ten times and not yet submitted
    if (!submitted && speechCount > 10) {
      setSubmitted(true); // Prevent further submissions
      onAutoSubmit(); // Call the auto-submit function
    }
  }, [speechCount, onAutoSubmit, submitted]);

  return (
    <div>
      <h3>Speech Detection</h3>
      {isMicActive ? (
        <p>Microphone is active. {speechDetected ? 'Speech detected!' : 'No speech detected.'}</p>
      ) : (
        <p>Microphone access is required for speech detection.</p>
      )}
    </div>
  );
};

export default SpeechDetection;
