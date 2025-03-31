
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

//-------------------------------------------------------------
//              FUNCTIONS AND SUBROUTINES



//Stop, wait, then Click between records at the '-----'   ..... not woirking at all
async function endUserVerify() {
  
//  fileContent.addEventListener ('change', function(event) { 
     // proceed after acknowledging end record delimiter "-----"
    // event.target.disabled = false;
//  });  // End Onclick Permission to Process
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
 


// PROCESSING OF EACH LINE FOR ITS WORTHWHILE DATA ELEMENTS

// Trim each line off the giant string ball to process 
    lines.forEach((line, index) => {
  
      
      line = line.trim();         // remove spaces at both ends
 //   output to browser
      dateTime.textContent = (`Line ${index}: ${line}`);     // Workin' Awesome
      

     if (line.length > 1 )  { //remove checking out or processing blank lines
      console.log(`Line ${index + 1}: ${line}`);       // Workin' Awesome
      let workString = line;

 // THIS IS THE BIG OUTPUT AREA.  **CAN* WE GET OUTPUT PAST THIS JS??!   
 
      console.log(`${workString}`);  /// working, shows the line without the index number
      console.log(`${line.length} , ${workString.length}`); ///working, equal length
//       some kind of DOM output to the html goes here






      for (let i = 0; i < 8; i++) {  // Run each line through the option of choices      // console.log(stVar.toString()); (useful)
        console.log(i);               // index value as the string array is accessed
        let tempString = keyPhrase[i];  // pass the string array value to a temp var - protect the array
        console.log(`Array selection: ${tempString}`);
        console.log(`WorkPhrase: ${workString}`);

   // check for end of record first
        if (line.includes("-----"))  {
          endRecordFlag = true;
          console.log(`Record end reached?  ${endRecordFlag}`);
          console.log("End Record Delimiter Received");
        } else {
          if (workString.startsWith(tempString)) {
            switch (i) {
              case 0:
                dateTime.textContent = workString;
         // output dateTime to JSON
                break;
              case 1:            
                startPos = 13;
                endPos = workString.length;
                let custText = workString.slice(startPos, endPos); 
                custName.textContent = custText;
                if (workString.indexOf(keyPhrase[2])>0) {    // Processing the model number
                   console.log("Model number is present on the same line as the customer's ID");
                   startPos = (workString.indexOf(keyPhrase[2])+14);
                   endPos = workString.length; 
                   model.textContent = workString.slice(startPos, endPos);
                   startPos = startPos-28;
                   custName.textContent = custName.slice(0,startPos);
                   if (model.startsWith("MX-M")) {
                     MFPtype.textContent="Monochrome";} 
                     else {MFPtype.textContent="Color";}
                   if ((model.startsWith("BP")) && (model.charAt(5)=="M")) 
                     {MFPtype.textContent="Monochrome";}
// Cust name, Output model and MFP type to json                 
                }   // End of  checking if the Device Name line has a Model Number
              break; // End Case 1
              case 2:
        // if the device model is at the beginning of the line  
               startPos = 14;
               endPos = workString.length;
               modTxt = workString.slice(startPos, endPos);
               if (modTxt != null) {model.textContent = modTxt};
               console.log(`modTxt: ${modTxt}`);
               if (modTxt.startsWith("MX-M")) {
                MFPtype.textContent="Monochrome";
                } else {MFPtype.textContent="Color";}
               if ((modTxt.startsWith("BP")) && (modTxt.charAt(5)=="M")) {
                MFPtype.textContent="Monochrome";}
                break; // End Case 2
              default:
                console.log(`Function for ${keyPhrase[i]} not yet implemented.`);

              } //end switch case
      } //end if (workString.startsWith(tempString))
     } //end else
     } // end for loop
    

//  END OF TEXT PROCESSING AND CONVERSION 


  }  // end of filtering out blank lines
   


    if (endRecordFlag) {
      fileContent.removeEventListener('click', arguments.callee);
      
      console.log("Click Read File to continue");
      fileContent.addEventListener ('click', endUserVerify, false );
     }
             //hold for clicking on Read File button
//SOMETHING'S GOTTA HAPPEN HERE .. ?????

        
 
    }); // end of splitting lines off the string wad 


    }       // End of (reader: onload) --loading the text fIle into one string variable 

  
   // Read the file as text
      reader.readAsText(file);
      



    })  // End of Click to Proceed Reading the Text file
    // fileContent.addEventListener ('click', function(event)
  } else {       // end of checking to see if the file is present
    console.log("No file selected.");


  }              // and this is the end of the catchall in case you cancel your file choice - Line 64  }              // and this is the end of the catchall in case you cancel your file choice - Line 64  }              // and this is the end of the catchall in case you cancel your file choice - Line 64
}); // End of the addeventlistener that selects the text file - Line 62

