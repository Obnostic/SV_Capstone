// function readFile() { \\
    const fileInput = document.getElementById('fileInput');
    const fileContentArea = document.getElementById('fileContent');

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const text = event.target.result;
        parseText(text);
      };
      reader.onerror = (event) => {
        console.error ("Error reading file:",event);
      };
      reader.readAsText(file);
    }
    });



    function parseText(text) {
      const lines = text.split('\n');

   /*   const dom = document.implementation.createHTMLDocument();
      const body = dom.body; */
    
      lines.forEach(line => {
        const values = line.split(': '); // Example: splitting by a delimiter
        console.log(values);
      });
    }
  
  
  /*      if (parts.length === 2) {
          const key = parts[0];
          const value = parts[1];
    
          const element = dom.createElement('div');
          element.textContent = `${key}: ${value}`;
          body.appendChild(element);
        }
      });
      console.log(dom);
    } */



    
 /*   const file = fileInput.files[0];
  
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
  document.body.appendChild(fileContentArea);

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


const filePath = fileContentArea;
processLineByLine(filePath).catch(err => {
    console.error(`Error processing file: ${err}`);
}); */