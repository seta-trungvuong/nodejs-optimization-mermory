// Define the number of items to generate
const numberOfItems = 1000000;

// Define the size of each item
const itemSize = 10; // Assuming each item is a string of 10 characters

// Function to generate a random item
function generateItem() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let item = '';
    for (let i = 0; i < itemSize; i++) {
        item += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return item;
}

// Function to calculate memory usage in MB
function getMemoryUsage() {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return Math.round(used * 100) / 100;
}

// Record initial memory usage
const initialMemoryUsage = getMemoryUsage();
console.log('Initial memory usage:', initialMemoryUsage, 'MB');

// Generate the list of items and track memory usage
let generatedString = ""
for (let i = 0; i < numberOfItems; i++) {
    generatedString += generateItem();
}

// console.log('Generated string:', generatedString);

// Record final memory usage
const finalMemoryUsage = getMemoryUsage();
console.log('Final memory usage:', finalMemoryUsage, 'MB');

console.log('Memory usage difference:', finalMemoryUsage - initialMemoryUsage, 'MB');
