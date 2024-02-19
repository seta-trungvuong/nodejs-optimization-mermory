// Define the number of items to generate
const numberOfItems = 1000000;

// Define the size of each item
const itemSize = 10; // Assuming each item is a string of 10 characters

// Function to calculate memory usage in MB
function getMemoryUsage() {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return Math.round(used * 100) / 100;
}

// Record initial memory usage
const initialMemoryUsage = getMemoryUsage();
console.log('Initial memory usage:', initialMemoryUsage, 'MB');

// Create a buffer to store all items
const buffer = Buffer.alloc(numberOfItems * itemSize);

// Function to generate a random item and write it to the buffer
function generateAndWriteItem(index) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let item = '';
    for (let i = 0; i < itemSize; i++) {
        item += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    buffer.write(item, index * itemSize, 'utf8');
}

// Generate the list of items by writing to the buffer
for (let i = 0; i < numberOfItems; i++) {
    generateAndWriteItem(i);
}
const generatedString = buffer.toString();
// console.log('Generated string:', generatedString);

// Record final memory usage
const finalMemoryUsage = getMemoryUsage();
console.log('Final memory usage:', finalMemoryUsage, 'MB');

console.log('Memory usage difference:', finalMemoryUsage - initialMemoryUsage, 'MB');

