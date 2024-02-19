const fs = require('fs');
const path = require('path');

// Function to generate random text
function generateRandomText(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';
    let randomText = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomText += characters.charAt(randomIndex);
    }
    return randomText;
}

// Function to generate a large file with random text
function generateLargeFile(filePath, fileSizeInBytes) {
    const fileSizeInBytesPerLine = 100; // Adjust line length as needed
    const numberOfLines = Math.ceil(fileSizeInBytes / fileSizeInBytesPerLine);

    const stream = fs.createWriteStream(filePath);

    for (let i = 0; i < numberOfLines; i++) {
        const randomText = generateRandomText(fileSizeInBytesPerLine);
        stream.write(randomText + '\n');
    }

    stream.end();
}

// Generate a large file with random text
const filePath = path.join(__dirname, 'large-data.txt');
const fileSizeInBytes = 1024 * 1024 * 10; // 10 MB
generateLargeFile(filePath, fileSizeInBytes);
