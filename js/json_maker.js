//<!DOCTYPE html>
//<html>
//<head>
//  <title>Create and Save JSON</title>
//  <script>
    // Your JavaScript code from above goes here (including the createAndSaveJSON function)
/**
 * Creates a JSON file (as a download) and fills it with the provided data.
 *
 * @param {object} data - The JavaScript object to be converted to JSON and saved.
 * @param {string} filename - The name of the file to save (without extension). Defaults to "data".
 */
function createAndSaveJSON(data, filename = "data") {
    try {
      // 1. Convert the JavaScript object to a JSON string.
      const jsonString = JSON.stringify(data, null, 2); // The '2' is for pretty-printing with 2 spaces indentation
  
      // 2. Create a Blob (Binary Large Object) from the JSON string.
      const blob = new Blob([jsonString], { type: "application/json" });
  
      // 3. Trigger the download.
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround
        window.navigator.msSaveBlob(blob, filename + ".json");
      } else {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename + ".json"; // Set the filename
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
      }
    } catch (error) {
      console.error("Error creating and saving JSON file:", error);
      alert("Failed to create and save the JSON file. See console for details."); // Provide feedback to the user
    }
  }
  
  // Example Usage (in an HTML context):
  //  1. Create some sample data:
  //     const myData = {
  //       name: "Example Data",
  //       version: 1.0,
  //       items: [
  //         { id: 1, value: "A" },
  //         { id: 2, value: "B" }
  //       ]
  //     };
  //
  //  2. Call the function:
  //     createAndSaveJSON(myData, "my_data"); //saves to user downloads folder
/*
  Key improvements and explanations:
  
  Clear Function Definition: The function createAndSaveJSON takes the data (as a JavaScript object) and the filename as arguments.
  
  JSON.stringify: Uses JSON.stringify() to convert the JavaScript object into a JSON string. The null, 2 arguments are important for pretty-printing the JSON with an indentation of 2 spaces, making it more readable. This is generally preferred for human-readable JSON files. If you want a more compact JSON (no indentation), use JSON.stringify(data).
  
  Blob Creation: Creates a Blob object from the JSON string. The type: "application/json" is crucial for specifying the correct MIME type, so the browser knows it's a JSON file.
  
  Download Trigger: Creates a download link (using an <a> element) and triggers a click event to initiate the download.
  
  IE Compatibility: Includes the window.navigator.msSaveBlob workaround for Internet Explorer.
  
  URL.revokeObjectURL: Releases the object URL created for the download link after the download is initiated, preventing memory leaks.
  
  Error Handling: Includes a try...catch block to handle potential errors during the JSON conversion or saving process. It logs the error to the console and displays an alert to the user.
  
  Complete Example Usage: The example demonstrates how to create sample data and call the createAndSaveJSON function.
  
  Security: Adheres to the same security restrictions as the Excel example. It will trigger a download and not directly save to any specific file system location.
  
  No external libraries: This code uses only built-in JavaScript functions (JSON.stringify, Blob, etc.), so you don't need to include any external libraries.
 */
 function generateJSON() {
      const myData = {
        name: "Example Data",
        version: 1.0,
        items: [
            ["WHAT", "WHO", "WHY", "A NUMBER"],
            ["Slip & Fall", "Some Dude", "Wet Floor", 16],
            ["Banged Head", "My Dad", "Tripped on the Stairs", 23],
            ["Sunburn", "Sister", "Fell Asleep", 12012]
          ]
      };
      createAndSaveJSON(myData, "test-out.json");
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