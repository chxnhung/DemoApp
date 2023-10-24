import CryptoJS from 'crypto-js';

const generateKeySHA256 = () => {
    // TODO: Save key into ENV
    const KEY = 'KEY';
    return CryptoJS.SHA256(KEY).toString();
};

export { generateKeySHA256 };
