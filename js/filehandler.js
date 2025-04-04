
// Capstone Data Parser
// Read a text file of Sharp MFP Statistics Reports
// Parse to gather selected data and create an Excel file

"use strict";

// DOM obj for file and button ops
const fileInput = document.getElementById("file-input");
const fileContent = document.getElementById("file-content");
const continueNextRecord = document.getElementById("continue-next-record")
const XLSCreatorGO = document.getElementById("XLS-Creator-GO");
const messAge = document.getElementById("message");



// DEFINING THE KEY PHRASES LISTED, IN ORDER, ON THE SHARP MFP REPORT
  // Both Device Name and Model MAY or MAY NOT be on the same line
const keyPhrase =["2025" , "Device Name" , "Device Model",
     "Serial" , "Black & White Total Print Count" , "Color Total Print Count" , "Toner Residual" , "-----" ] // <- endRecordFlag



// DECLARATION OF NEEDED WORK VARIABLES
let lineRecord = [];   //array
let dummyTxt=""; let modTxt="";  // TXT
let startPos = 0; let endPos = 0;  let d=0; let indEx=0; // VAR          indEx and lineRecord are the major totem objects
let endRecordFlag = false; // BOOL




//-------------------------------------------------------------
//              FUNCTIONS AND SUBROUTINES


// pause display to show each record processed  - Not working.  Only the last record is presented
/*async function pauseTimer(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}


async function pauseDisplay() {               // i guess this is running okay but with pause timer it still looks like it doesn't do a thing
  messAge.textContent = "Processing next record...";
  await pauseTimer(3000); // 3000 milliseconds = 3 seconds
  messAge.textContent = "";                   // this is all upside down in its execution but you can show any message directly into the browser
}
*/
          


// ---------------------  PROGRAM START --------------------
for (let d = 0; d < 8; d++) {  // column titles will be the first array entry in a large horizontal array,
                                                        //  so row 0 = cells 0-7, row 1 = cells 8-14, row 2 = cells 15-21...
  let f=keyPhrase[d];       
  console.log(f.toString());  // output to show that access to table elements are working - just for show - does nothing to the array
}  


//------------------------ File handling and splitting strings off the blob to process ---------------------------------
 

fileInput.addEventListener('change', function(event) {  // Get the file selected by user in the html
  const file = event.target.files[0];           // All action in the index.html stops for the enduser to select a text file of MFP data

  if (file) {                                           // avoids bombout for no files chosen
    const reader = new FileReader();

    fileContent.addEventListener ('click', function(event) {  //hold action for clicking on Read File button
   
     // Get the file content as a string
    reader.onload = function(e) {
    const fileContents = e.target.result;  // at this point fileContents has the entire file as one string
 
// Split the content into lines (by newline characters)
    const lines = fileContents.split('\n');     // other detectors? - messing with the file length
 
    messAge.textContent="";

// PROCESSING OF EACH LINE FOR ITS WORTHWHILE DATA ELEMENTS 

// Trim each line off the giant string blob to process 
    lines.forEach((line, index) => {

      line = line.trim();           // remove spaces at both ends ... ?


      if (line.length > 1 )  {      // filter out the blank lines

  // NAUGHTY CALL!!        dataParse (line,lineRecord,indEx);  // Dataparse the line?  nfw


let result = dataParse(line, lineRecord, indEx);

lineRecord = result.lineRecord;
  
indEx = result.indEx;
  
  
        }  // end of filtering out blank lines
   

 

    }); // end of splitting lines off the string blob

// This displays the contents of the entire array
    let arrayTotal = lineRecord.length
    for (let k = 0; k < arrayTotal; k++) { 
       console.log(`Array ${k} : ${lineRecord[k]}`);
       }
    

    }       // End of (reader: onload) --loading the text fIle into one string variable 

  
   // Read the file as text  (corresponding to something way up there)
      reader.readAsText(file);
      



    })  // End of Click to Proceed Reading the Text file

  } else {       // end of checking to see if the file is present
    console.log("No file selected.");


  }              // and this is the end of the catchall in case you cancel your file choice 

}); // End of the addeventlistener that selects the text file


//----------------- THAT'S ALL, FOLKS! ---------------------------- abbadeea abbadeea abbadeea abbadeea 