import { storage } from "./firebase-config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const startButton = document.getElementById('startButton');
const cameraContainer = document.getElementById('cameraContainer');
const cameraView = document.getElementById('cameraView');
const settingsBtn = document.querySelector('.settings-btn');
const captureBtn = document.querySelector('.capture-btn');
startButton.addEventListener('click', () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(stream => {
            cameraView.srcObject = stream;
            startButton.classList.add('hidden');
            cameraContainer.classList.remove('hidden');
        })
            .catch(err => {
            console.error('The null error when access the photo camera', err);
            alert('The photo camera access was not succeed. Possible authorization error');
        });
    }
    else {
        alert('Browser error. The browser does not supports the photo camera');
    }
});
settingsBtn.addEventListener('click', () => {
    const stream = cameraView.srcObject;
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        cameraView.srcObject = null;
    }
    cameraContainer.classList.add('hidden');
    startButton.classList.remove('hidden');
});
const captureCanvas = document.createElement('canvas');
const captureContext = captureCanvas.getContext('2d');
captureBtn.addEventListener('click', () => {
    if (!captureContext)
        return;
    captureCanvas.width = cameraView.videoWidth;
    captureCanvas.height = cameraView.videoHeight;
    captureContext.drawImage(cameraView, 0, 0, captureCanvas.width, captureCanvas.height);
    const photoDataUrl = captureCanvas.toDataURL('image/png');
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'white';
    flash.style.opacity = '0.8';
    flash.style.zIndex = '15';
    flash.style.transition = 'opacity 0.5s';
    document.body.appendChild(flash);
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
    setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(flash);
        }, 500);
    }, 100);
    const imageBlob = base64ToBlob(photoDataUrl);
    uploadImage(imageBlob);
});
function base64ToBlob(base64) {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "image/jpeg" });
}
async function uploadImage(file) {
    const storageRef = ref(storage, `images/${Date.now()}.jpg`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log("Image URL:", url);
    return url;
}
