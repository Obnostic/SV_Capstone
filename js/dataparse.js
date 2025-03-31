
// Capstone Data Parser
// Read a text file of Sharp MFP Statistics Reports
// Parse to gather selected data and create an Excel file

"use strict";

// DOM obj for file and button ops
const fileInput = document.getElementById("file-input");
const fileContent = document.getElementById("file-content");

//might be useful
//const formSubmit = document.getElementById("form-submit");
//const textLineOutput = formSubmit.elements["text-line-output"];

//DOM obj to pass to html
const dateTime =  document.getElementById("date-n-time");
const custName =  document.getElementById("customer");
const model = document.getElementById("mfp-model");
const MFPtype = document.getElementById("mfp-type");
const serNo = document.getElementById("ser-no");
const monoCount = document.getElementById("b+w-total");
const colorCount = document.getElementById("col-total");
const tonerLow = document.getElementById("toner-low");
const tonerVLow = document.getElementById("toner-v-low");


// DEFINING THE KEY PHRASES LISTED, IN ORDER, ON THE SHARP MFP REPORT
  // Both Device Name and Model MAY or MAY NOT be on the same line
const keyPhrase =["2025" , "Device Name" , "Device Model",
     "Serial" , "Black & White Total Print Count" , "Color Total Print Count" , "Toner Residual" , "-----" ] // <- endRecordFlag


// DECLARATION OF NEEDED WORK VARIABLES
let dummyTxt=""; let modTxt="";  // TXT
let startPos = 0; let endPos = 0;  // VAR
let endRecordFlag = false; // BOOL




//Stop, wait, then Click between records at the '-----'   ..... not woirking at all
async function endUserVerify() {
  
  fileContent.addEventListener ('change', function(event) { 
     // proceed after acknowledging end record delimiter "-----"
    // event.target.disabled = false;
  });  // End Onclick Permission to Process
}                                                       // End function endUserVerify


// breaking line data down to its' individual values - low priority
function parseModel(txt,cFlag) {}
function trimSerial(txt) {}
function colorTally(txt,cFlag) {}
function monoTally(txt,cFlag) {}
function lowTonerAlert(txt,whichTC,cFlag) {}
//  this will probably have another method spliced in soon...


// ---------------------  PROGRAM START --------------------
for (let d = 0; d < 8; d++) {  // This is to test access to the array
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
    const fileContent = e.target.result;  // at this point fileContent has the entire file as one string
     
// Split the content into lines (by newline characters)
    const lines = fileContent.split('\n');     // other detectors? - messing with the file length
 


// Trim each line off the giant string ball and process 
    lines.forEach((line, index) => {
  
      
      line = line.trim();         // remove spaces at both ends
// output to browser
      dateTime.textContent = (`Line ${index}: ${line}`);     // Workin' Aweso
      

      if (line.length > 1 )  { //remove checking out or processing blank lines
        console.log(`Line ${index + 1}: ${line}`);       // Workin' Awesome
        let workString = line

     // THIS IS THE BIG OUTPUT AREA.  **CAN* WE GET OUTPUT PAST THIS JS??!   
 
        console.log(`${workString}`);  /// working, shows the line without the index number
        console.log(`${line.length} , ${workString.length}`); ///working, equal length
//       some kind of DOM output to the html goes here

        for (let i = 0; i < 8; i++) {  // Run each line through the option of choices      // console.log(stVar.toString()); (useful)
          console.log(i);               // index value as the string array is accessed
          let tempString = keyPhrase[i];  // pass the string array value to a temp var - protect the array
          console.log(`Array selection: ${tempString}`);
          console.log(`WorkPhrase: ${workString}`);
     //
     // 
     // 
     // 
          if (line.includes("-----"))     {endRecordFlag = !endRecordFlag}
          console.log(`Record end reached?  ${endRecordFlag}`);
  // output to eventually be routed to the json creator
                }    //done running through the string array for parsing this line

//  END OF TEXT PROCESSING AND CONVERSION 



     } ; // end of checking for blank lines - line 88

      if (endRecordFlag) {
        console.log("End Record Delimiter Received")
        fileContent.addEventListener ('click', function(event) {  //hold for clicking on Read File button
        
        
        });

      }





}); // end of splitting off the lines from the string wad 



   }       // End of loading the text fIle into one string variable   (reader: onload)

  
   // Read the file as text
      reader.readAsText(file);
      



    })  // End of Click to Proceed Reading the Text file
  } else {       // end of checking to see if the file is present
    console.log("No file selected.");


  }              // and this is the end of the catchall in case you cancel your file choice - Line 64  }              // and this is the end of the catchall in case you cancel your file choice - Line 64  }              // and this is the end of the catchall in case you cancel your file choice - Line 64
}); // End of the addeventlistener that selects the text file - Line 62

