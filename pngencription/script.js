document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type === 'image/png') {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            document.getElementById('imageDisplay').innerHTML = '';
            document.getElementById('imageDisplay').appendChild(img);
        }
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a PNG image.');
    }
});

document.getElementById('encryptButton').addEventListener('click', function() {
    const imageDisplay = document.getElementById('imageDisplay');
    const keyDisplay = document.getElementById('keyDisplay');
    const encryptedImageDisplay = document.getElementById('encryptedImageDisplay');
    const downloadLink = document.getElementById('downloadLink');

    if (!imageDisplay.firstChild) {
        alert('Please upload a PNG image to encrypt.');
        return;
    }

    const key = generateKey();
    keyDisplay.textContent = 'Encryption Key: ' + key;

    const canvas = document.createElement('canvas');
    const img = imageDisplay.firstChild;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Encryption logic (simple XOR for demonstration)
    for (let i = 0; i < imageData.data.length; i++) {
        imageData.data[i] = imageData.data[i] ^ key.charCodeAt(i % key.length);
    }
    ctx.putImageData(imageData, 0, 0);

    const encryptedImage = document.createElement('img');
    encryptedImage.src = canvas.toDataURL('image/png');
    encryptedImageDisplay.innerHTML = '';
    encryptedImageDisplay.appendChild(encryptedImage);

    // Create download link
    downloadLink.href = encryptedImage.src;
    downloadLink.download = 'encrypted-image.png';
    downloadLink.style.display = 'block';

    // Save encrypted image and key to a folder (client-side limitation)
    saveEncryptedData(encryptedImage.src, key);
});

function generateKey() {
    let key = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const keyLength = 32; // Increased key length for better security (still weak for real-world use)
    for (let i = 0; i < keyLength; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}

function saveEncryptedData(encryptedImageData, key) {
    // Client-side JavaScript cannot directly create folders and save files to the local file system without user interaction.
    // For a real application, server-side processing would be necessary to handle file saving securely.
    // This function is a placeholder to illustrate the concept.
    alert('Encrypted image and key are generated. Please copy the key and download the encrypted image. ' +
          'Note: Automatic folder creation and file saving to the local system is not possible client-side.');
}

document.getElementById('encryptedImageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type === 'image/png') {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            document.getElementById('encryptedImageDisplay').innerHTML = '';
            document.getElementById('encryptedImageDisplay').appendChild(img);
        }
        reader.readAsDataURL(file);
    } else {
        alert('Please upload an encrypted PNG image.');
    }
});

document.getElementById('decryptButton').addEventListener('click', function() {
    const encryptedImageDisplay = document.getElementById('encryptedImageDisplay');
    const decryptedImageDisplay = document.getElementById('decryptedImageDisplay');
    const decryptionKeyInput = document.getElementById('decryptionKey');
    const key = decryptionKeyInput.value;

    if (!encryptedImageDisplay.firstChild) {
        alert('Please upload an encrypted PNG image to decrypt.');
        return;
    }
    if (!key) {
        alert('Please enter the decryption key.');
        return;
    }

    const canvas = document.createElement('canvas');
    const img = encryptedImageDisplay.firstChild;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Decryption logic (reverse XOR)
    for (let i = 0; i < imageData.data.length; i++) {
        imageData.data[i] = imageData.data[i] ^ key.charCodeAt(i % key.length);
    }
    ctx.putImageData(imageData, 0, 0);

    const decryptedImage = document.createElement('img');
    decryptedImage.src = canvas.toDataURL('image/png');
    decryptedImageDisplay.innerHTML = '';
    decryptedImageDisplay.appendChild(decryptedImage);
});
