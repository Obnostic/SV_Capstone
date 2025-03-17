
// Get the file input element
const fileInput = document.getElementById('fileInput');
const fileContent = document.getElementById('fileContent');



// fileContent.addEventListener ('click', function(event) { //

fileInput.addEventListener('change', function(event) {
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
         if (line.length > 1)  {
            // here's where we start pulling only the data we need.
            //   I will overwrite and mindlessly repeat the same code, then consolidate
            // search the text for the following data:
            // Date in the format YYYY/MM/DD
            // Device Name:
            // Device Model:  Parse to determine if this is a Monochrome or Color Machine
            // Both Device Name and Model MAY or MAY NOT be on the same line
            // Serial Number: Remove the 2 zeroes padding the end, Sharp MFPs only use an 8 digit S/N
            // Black & White Total Print Count:  Followed by a ' = ' and a number from 2 to 7 digits
            // IF the MFP is a color machine them
            // Color Total Print Count:  same syntax as above
            // ** the two Total Print Counts MAY or MAY NOT be on the same line
            // Finally , Low Toner Alert:
            // For monochrome, it's Toner Residual (Bk)
            // For Color, it's Toner Residual each of C,M,Y
            // Sometimes they are listed as Percentages, sometimes as Ranges
            // For each color, if the Percentage is below 25%, alert the end user to have a backup ready
            // if the RANGE is 0%-25%, alert the end user to have a backup ready
            // if the Percentage is 10% or less, tell the enduser that their toner is ALMOST OUT
            // Otherwise don't mention toner amounts at all
            // The oblect is to display the valid information in the browser, and wait for the end user to push a button to confirm.
            // Then we will use a SQL API to feed the information into a spreadsheet

            console.log(`Line ${index + 1}: ${line}`); 
          
          
          
          
          };
      });


    };




  // Read the file as text
  reader.readAsText(file);
    } else {
  console.log("No file selected.");
  }
});

