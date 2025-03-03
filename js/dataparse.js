// function readFile() { \\
    const fileInput = document.getElementById('fileInput');
    const fileContentArea = document.getElementById('fileContent');
  
    const file = fileInput.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function(event) {
        fileContentArea.textContent = event.target.result;
      };
  
      reader.onerror = function(event) {
        fileContentArea.textContent = "Error reading file.";
      };
  
      reader.readAsText(file);
    } else {
      fileContentArea.textContent = "Please select a file.";
    }
  //} \\
  document.body.appendChild(inputElement);

const fs = require('fs');
const readline = require('readline');

async function processLineByLine(filePath) {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity // To handle different line endings (CRLF or LF)
    });

    for await (const line of rl) {
        // Process each line here
        console.log(`Line: ${line}`);
        // You can perform operations on the line, like splitting it into words,
        // extracting data, or any other processing you need.
    }
}


const filePath = fileInput;
processLineByLine(filePath).catch(err => {
    console.error(`Error processing file: ${err}`);
});