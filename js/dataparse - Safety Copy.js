
// Capstone Data Parser
// Read a text file of Sharp MFP Statistics Reports
// Parse to gather selected data and create and Excel file


const fileInput = document.getElementById('fileInput');
const fileContent = document.getElementById('fileContent');



function endUserVerify () {
  fileContent.addEventListener ('click', function(event) { 
     // proceed after acknowledging end record delimiter "-----"

  });  // End Onclick Permission to Process


}  // End function endUserVerify

 // Get the file selected by user in the html

fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();


// hold for approval by user:  Read file

fileContent.addEventListener ('click', function(event) { 

  // Get the file content as a string
    reader.onload = function(e) {
    const fileContent = e.target.result; 
   

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
            // Finally, reading the delimiter "-----" should pause processing
            // ... and allow the enduser to review and approve to continue.


      console.log(`Line ${index + 1}: ${line}`); 
          
          
          
          
          };
      });


    };




  // Read the file as text
  reader.readAsText(file);
  
  });     // End of Read File On Click


    } else {
  console.log("No file selected.");
  }
}); // End of Get File On Click

