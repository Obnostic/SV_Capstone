
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

//might be useful
//const formSubmit = document.getElementById("form-submit");
//const textLineOutput = formSubmit.elements["text-line-output"];




// DEFINING THE KEY PHRASES LISTED, IN ORDER, ON THE SHARP MFP REPORT
  // Both Device Name and Model MAY or MAY NOT be on the same line
const keyPhrase =["2025" , "Device Name" , "Device Model",
     "Serial" , "Black & White Total Print Count" , "Color Total Print Count" , "Toner Residual" , "-----" ] // <- endRecordFlag



// DECLARATION OF NEEDED WORK VARIABLES
let lineRec = [];   //array
let a=0;    // a is the index for tracking the array
let dummyTxt=""; let modTxt="";  // TXT
let startPos = 0; let endPos = 0;  let d=0; let indEx=0; // VAR
let endRecordFlag = false; // BOOL

//-------------------------------------------------------------
//              FUNCTIONS AND SUBROUTINES





// ---------------------  PROGRAM START --------------------
for (let d = 0; d < 8; d++) {  // column titles are first array entry
  let f=keyPhrase[d];       
  console.log(f.toString());  // output to eventually be routed to the json creator
}                      //access to table elements are working


// could be useful
//  textLineOutput.value = y.textContent;
//  formSubmit.addEventListener("output", textLineOutput);


//-----------------------------------------------------------------------------------
 

fileInput.addEventListener('change', function(event) {  // Get the file selected by user in the html
  const file = event.target.files[0]; 

  if (file) {                                           // avoids bombout for no files chosen
    const reader = new FileReader();

    fileContent.addEventListener ('click', function(event) {  //hold for clicking on Read File button
   
     // Get the file content as a string
    reader.onload = function(e) {
    const fileContents = e.target.result;  // at this point fileContents has the entire file as one string
 
// Split the content into lines (by newline characters)
    const lines = fileContents.split('\n');     // other detectors? - messing with the file length
 


// PROCESSING OF EACH LINE FOR ITS WORTHWHILE DATA ELEMENTS

// Trim each line off the giant string ball to process 
    lines.forEach((line, index) => {

      line = line.trim();         // remove spaces at both ends


      if (line.length > 1 )  {  
        dataParse (line,lineRec,indEx);  // Dataparse the line
        }  // end of filtering out blank lines
   

//    if (endRecordFlag) {
//    
      
//      console.log("Click Read File to continue");
 //     fileContent.addEventListener ('click', endUserVerify, false );
   

    messAge.textContent = "End of record. Click Process Record for next.";
    continueNextRecord.addEventListener ('click', function(event) { 
      messAge.textContent = "";
            })
 
            let arrayTotal = lineRec.length
            for (let k = 0; k < arrayTotal; k++) { 
               console.log(`Array ${k} : ${lineRec[k]}`);
               }
    }); // end of splitting lines off the string blob



    }       // End of (reader: onload) --loading the text fIle into one string variable 

  
   // Read the file as text
      reader.readAsText(file);
      



    })  // End of Click to Proceed Reading the Text file
  
    
  } else {       // end of checking to see if the file is present
    console.log("No file selected.");


  }              // and this is the end of the catchall in case you cancel your file choice 

}); // End of the addeventlistener that selects the text file - Line 62

