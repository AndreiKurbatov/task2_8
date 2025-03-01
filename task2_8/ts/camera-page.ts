const startButton = document.getElementById('startButton') as HTMLElement;
const cameraContainer = document.getElementById('cameraContainer') as HTMLElement;
const cameraView = document.getElementById('cameraView') as HTMLVideoElement;
const settingsBtn = document.querySelector('.settings-btn') as HTMLElement;
const captureBtn = document.querySelector('.capture-btn') as HTMLElement;

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
    } else {
        alert('Browser error. The browser does not supports the photo camera');
    }
});

settingsBtn.addEventListener('click', () => {
    const stream = cameraView.srcObject as MediaStream | null;
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        cameraView.srcObject = null;
    }
    cameraContainer.classList.add('hidden');
    startButton.classList.remove('hidden');
});

captureBtn.addEventListener('click', () => {
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
});