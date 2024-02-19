const fs = require('fs');

// Function to get memory usage
function getMemoryUsage() {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return Math.round(used * 100) / 100;
}

// Record initial memory usage
const initialMemoryUsage = getMemoryUsage();
console.log('Initial memory usage:', initialMemoryUsage, 'MB');

// Function to process a line of text: remove spaces and convert to uppercase
function processLine(line) {
    return line.replace(/\s/g, '').toUpperCase();
}
// Read the entire file into memory
fs.readFile('large-data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Process the file data (example: count lines)
    const transformedLines = data.split('\n').map(line => processLine(line));

    // Write transform lines to a new file
    fs.writeFile('transform-data.txt', transformedLines.join('\n'), 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('Transformed lines written to transform-data.txt');
    });

    // Record final memory usage
    const finalMemoryUsage = getMemoryUsage();
    console.log('Final memory usage:', finalMemoryUsage, 'MB');

    console.log('Memory usage difference:', finalMemoryUsage - initialMemoryUsage, 'MB');
});
