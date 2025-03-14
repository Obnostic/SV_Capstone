// function readFile() { \\

// Get the file input element
const fileInput = document.getElementById('fileInput');
const fileContent = document.getElementById('fileContent');




fileContent.addEventListener ('click', function(event) {

fileInput.addEventListener('click', function(event) {
  const file = event.target.files[0]; // Get the file selected by user in the html
  if (file) {
    const reader = new FileReader();

// hold for approval by user:  Read file
  reader.onload = function(e) {
    const fileContent = e.target.result; // Get the file content as a string
  
  // Split the content into lines (by newline characters)
    const lines = fileContent.split('\n');
  
  // Output each line to the console
    lines.forEach((line, index) => {
    console.log(`Line ${index + 1}: ${line}, ${lineLength}`);
    let dv=line.substring(0,5)
    console.log(dv); 
    }
    

  
  );
  }

  // Read the file as text
    reader.readAsText(file);
  } else {
    console.log("No file selected.");
  }
});
  
});

