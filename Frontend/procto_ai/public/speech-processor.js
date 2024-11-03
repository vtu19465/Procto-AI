// src/components/SpeechProcessor.js
class SpeechProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
      this.speechCount = 0;
      this.threshold = 0.1; // Adjust threshold based on your needs
    }
  
    process(inputs) {
      const input = inputs[0];
      if (input) {
        const channelData = input[0];
  
        // Simple speech detection logic (modify as needed)
        for (let i = 0; i < channelData.length; i++) {
          if (Math.abs(channelData[i]) > this.threshold) {
            this.speechCount++;
            if (this.speechCount > 6) {
              // Send a warning if speech is detected more than 6 times
              this.port.postMessage({ type: 'warning', message: 'Keep quiet!' });
            }
            if (this.speechCount > 9) {
              // Trigger auto submission if speech is detected more than 9 times
              this.port.postMessage({ type: 'autoSubmit' });
            }
          }
        }
      }
  
      return true; // Keep the processor alive
    }
  }
  
  registerProcessor('speech-processor', SpeechProcessor);
  