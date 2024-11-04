class SpeechProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
      this.speechCount = 0;
      this.threshold = 0.1; 
    }
  
    process(inputs) {
      const input = inputs[0];
      if (input) {
        const channelData = input[0];
  
        for (let i = 0; i < channelData.length; i++) {
          if (Math.abs(channelData[i]) > this.threshold) {
            this.speechCount++;
            if (this.speechCount > 6) {
              this.port.postMessage({ type: 'warning', message: 'Keep quiet!' });
            }
            if (this.speechCount > 9) {
              this.port.postMessage({ type: 'autoSubmit' });
            }
          }
        }
      }
  
      return true;
    }
  }
  
  registerProcessor('speech-processor', SpeechProcessor);
  