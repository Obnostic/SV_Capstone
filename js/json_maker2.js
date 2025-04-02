//<!DOCTYPE html>
//<html>
//<head>
//  <title>Create and Save JSON</title>
//  <script>
    // Your JavaScript code from above goes here (including the createAndSaveJSON function)
/**
 * Creates a JSON file (as a download) and fills it with the provided data.
 *
 /* @param {object} data - The JavaScript object to be converted to JSON and saved.
 * @param {string} filename - The name of the file to save (without extension). Defaults to "data".
 */
function appendAndSaveJSON(data, filename = "template") {
    
    
const fs = require('fs');
const filePath = '.../SV_Capstone/json/template.js'; // Replace with the actual path to your JSON file

try {
  // Read the JSON file synchronously
  const rawData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(rawData);

  // Modify the data (example: append to an array)
    if (Array.isArray(data.items)) {
      data.items.push({ id: 4, name: 'New Item' });
    } else if (typeof data === 'object' && data !== null) {
      data.newProperty = 'New Value';  // Add a new property
    }
     else {
      console.error('Data is not an object or array, cannot append');
      return;
    }
  // Convert the modified data back to a JSON string
  const modifiedJson = JSON.stringify(data, null, 2);

  // Write the modified JSON back to the file
  fs.writeFileSync(filePath, modifiedJson, 'utf8');
  console.log('JSON file updated successfully.');
} catch (error) {
  console.error('Error:', error);
}
}

 function generateJSON() {
      const myData = {
        name: "Example Data",
        version: 1.0,
        items: [
          [lineRecord]
          ]
      };
      appendAndSaveJSON(myData, "result");
    }
//  </script>
//</head>
//<body>
 // <button onclick="generateJSON()">Create and Save JSON</button>
//</body>
//</html>
//Use code with caution.
//Html
//Save the HTML file: Save the code as an HTML file (e.g., index.html).

//Open in a browser: Open the HTML file in a web browser (Chrome, Firefox, Safari, Edge, etc.).

//Click the button: Click the "Create and Save JSON" button.

//Download: Your browser should prompt you to download a file named "my_data.json". You can then choose where to save it.

//This will download a JSON file containing the myData object. The contents of my_data.json will look like this (with pretty-printing):

//{
 // "name": "Example Data",
//  "version": 1.0,
//  "items": [
//    {
//      "id": 1,
 //     "value": "A"
//    },
///    {
//      "id": 2,
//      "value": "B"
//    }
 // ]
//}