const fs = require('fs');
const readline = require('readline');

// Function to get memory usage
function getMemoryUsage() {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return Math.round(used * 100) / 100;
}

// Record initial memory usage
const initialMemoryUsage = getMemoryUsage();
console.log('Initial memory usage:', initialMemoryUsage, 'MB');

// Create a readable stream to read data from the input file
const inputStream = fs.createReadStream('large-data.txt');

// Create a writable stream to write transform data to the output file
const outputStream = fs.createWriteStream('transform-data.txt');

// Create an interface to read data line by line
const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity // Preserve line terminators
});

// Function to process a line of text: remove spaces and convert to uppercase
function processLine(line) {
    return line.replace(/\s/g, '').toUpperCase();
}
// Process each line of data
rl.on('line', (line) => {
    const transformData = processLine(line)
    outputStream.write(`${transformData}\n`);
   
});

// Handle errors
rl.on('error', (err) => {
    console.error('Error reading file:', err);
});

outputStream.on('error', (err) => {
    console.error('Error writing to file:', err);
});

// Close the output stream when processing is complete
rl.on('close', () => {
    console.log('Processing complete.');
    outputStream.end();
    // Record final memory usage
    const finalMemoryUsage = getMemoryUsage();
    console.log('Final memory usage:', finalMemoryUsage, 'MB');

    console.log('Memory usage difference:', finalMemoryUsage - initialMemoryUsage, 'MB');
});
