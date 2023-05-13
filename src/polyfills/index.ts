import { Buffer } from 'buffer';

const setPolyfills = () => {
  // This check confirms that the code is being executed in a browser environment.
  // In Node.js, 'window' would be 'undefined', but in a browser, 'window' is the global object.
  if (typeof window !== 'undefined') {
    // Browsers don't have a built-in Buffer object like Node.js does.
    // To make our code compatible with browsers, we assign the imported 'Buffer'
    // from the 'buffer' module to the global 'window' object.
    // This way, any subsequent code that references 'Buffer' will be using
    // the 'Buffer' from the 'buffer' module, allowing the same code to work
    // in both Node.js and browser environments.
    window.Buffer = Buffer;
  }
};

export default setPolyfills;
