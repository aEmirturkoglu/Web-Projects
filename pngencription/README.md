# PNG Encryption Web App Documentation

## Overview

The PNG Encryption Web App is a tool that allows you to encrypt and decrypt PNG images directly in your browser. This can be used to protect sensitive images by making them unviewable without the correct decryption key (password).

## How to Use

1.  **Open the Application:** Navigate to the `pngencription` folder in the repository. Open the `index.html` file in your web browser.

2.  **Select Operation (Encrypt or Decrypt):** On the webpage, you will see two main sections: "Encrypt Image" and "Decrypt Image". Choose whether you want to encrypt or decrypt an image.

### Encryption

1.  **Go to "Encrypt Image" section.**
2.  **Choose an Image:** Click the "Choose File" button in the "Encrypt Image" section. Select the PNG image file you want to encrypt from your computer.
3.  **Enter Password:** Enter a password in the "Enter password" field. This password will be used to encrypt the image, and you will need it to decrypt the image later. **Remember this password!**
4.  **Encrypt Image:** Click the "Encrypt" button.
5.  **Download Encrypted Image:** After encryption, the application will automatically download the encrypted image file. Save it to your desired location. The encrypted file will likely not be viewable as a normal image.

### Decryption

1.  **Go to "Decrypt Image" section.**
2.  **Choose Encrypted Image:** Click the "Choose File" button in the "Decrypt Image" section. Select the encrypted PNG image file you want to decrypt from your computer.
3.  **Enter Password:** Enter the **same password** you used to encrypt the image in the "Enter password" field.
4.  **Decrypt Image:** Click the "Decrypt" button.
5.  **View/Download Decrypted Image:** If the password is correct, the decrypted image will be displayed on the page. You can then right-click on the image to save it, or it may be automatically downloaded depending on your browser settings. If the password is incorrect, decryption will fail.

## Diagram

### Encryption

```mermaid
graph LR
    A[Open index.html in Browser] --> B(Go to "Encrypt Image" Section);
    B --> C(Click "Choose File" and Select PNG Image);
    C --> D(Enter Password);
    D --> E(Click "Encrypt" Button);
    E --> F[Download Encrypted Image];
```

### Decryption

```mermaid
graph LR
    A[Open index.html in Browser] --> B(Go to "Decrypt Image" Section);
    B --> C(Click "Choose File" and Select Encrypted PNG Image);
    C --> D(Enter Password);
    D --> E(Click "Decrypt" Button);
    E --> F[View/Download Decrypted Image (if password is correct)];
    E --> G[Decryption Failed (if password is incorrect)];
```

These diagrams illustrate the encryption and decryption processes. For encryption, you select an image, enter a password, and encrypt. For decryption, you select the encrypted image, enter the **same** password, and decrypt to view the original image.  **Important:** Keep your password safe and remember it, as it is essential for decryption.
