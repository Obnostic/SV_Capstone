
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
const model = document.getElementById("model-num");
const serNo = document.getElementById("serial-num");
const monoCount = document.getElementById("b+w-total");
const colorCount = document.getElementById("col-total");

// DEFINING THE KEY PHRASES LISTED, IN ORDER, ON THE SHARP MFP REPORT
  // Both Device Name and Model MAY or MAY NOT be on the same line
const keyPhrase =["2025" , "Device Name" , "Device Model",
     "Serial" , "Black & White Total Print Count" , "Color Total Print Count" , "Toner Residual" , "-----" ] // <- endRecordFlag

let dummyTxt=""; let modTxt="";
let startPos = 0; let endPos = 0;


// ------------- DECLARATIONS FOR EXCELJS ------------------------
// XLS writer - what is 'require'?
//const ExcelJS = require('exceljs');

// info from https://builtin.com/software-engineering-perspectives/exceljs

//const typedTextSpan = document.querySelector(".typed-text");
//const cursor = documentr.querySelector(".cursor");

// vsaariables are typedTextSpan and Cursor



//Stop, wait, then Click between records at the '-----'
function endUserVerify() {
  
  fileContent.addEventListener ('change', function(event) { 
     // proceed after acknowledging end record delimiter "-----"
    // event.target.disabled = false;
  });  // End Onclick Permission to Process
}  // End function endUserVerify


// breaking line data down to its' individual values - low priority
function parseModel(txt,cFlag) {}
function trimSerial(txt) {}
function colorTally(txt,cFlag) {}
function monoTally(txt,cFlag) {}
function lowTonerAlert(txt,whichTC,cFlag) {}



// ---------------------  PROGRAM START --------------------
for (let i = 0; i < 8; i++) {
  let y=keyPhrase[i];
  console.log(y.toString());
//  textLineOutput.value = y.textContent;
//  formSubmit.addEventListener("output", textLineOutput);
 }                      //access to table elements are working

//-----------------------------------------------------------------------------------
 

fileInput.addEventListener('change', function(event) {  // Get the file selected by user in the html
  const file = event.target.files[0]; 

  if (file) {   
    const reader = new FileReader();



    fileContent.addEventListener ('click', function(event) {  //hold for clicking on Read File button
   
     // Get the file content as a string
   reader.onload = function(e) {
    const fileContent = e.target.result;
     
    // Split the content into lines (by newline characters)
        const lines = fileContent.split('\n');
 


// Trim each line off the giant string ball and process 
lines.forEach((line, index) => {


  line = line.trim();
  if (line.length > 1 )   //remove checking out or processing blank lines
     {  

// ------------- START OF PROCESSING TEXT FILE DATA
      if (line.startsWith("2025")) {dateTime.textContent = line;}  //Report date, will develop later for multiple years


      if (line.startsWith("Device Name")) {    // This is the client-entered machine name
                dummyTxt = "Device Name"
                startPos = (dummyTxt.length)+2;
                endPos = line.length;
                let custText = line.slice(startPos, endPos); 
                if (custName !=null){custName.textContent = custText;}
       // occasionallly a CRLF will not be fed and so the Device Model may appear on the same line         
       // this section parses and processes the model number

              if (line.indexOf("Device Model")>0) {    // Processing the model number
                console.log("Model number is present on the same line as the customer's ID");
                startPos = (line.indexOf("Device Model")+14);
                endPos = line.length; 
                model = line.slice(startPos, endPos);
                startPos = startPos-28;
                custName.textContent = custName.slice(0,startPos);
                if (model.startsWith("MX-M")) {MFPtype.textContent="Monochrome"} else {MFPtype.textContent="Color";}
                if ((model.startsWith("BP")) && (model.charAt(5)="M")) {MFPtype.textContent="Monochrome";}
              }   // End of checking if the Device Name line has a Model Number

}  //  End of processing the Device Name line, with or without Model Number



      if  (line.startsWith("Device Model"))   {  // if the device model is at the beginning of the line
       
           dummyTxt = "Device Model";
          startPos = (dummyTxt.length)+2;
         endPos = line.length;
         modTxt = line.slice(startPos, endPos);
   //      if (modTxt != null) {model.textContent = modTxt};
   //      if (model.startsWith("MX-M")) {MFPtype.textContent="Monochrome"} else {MFPtype.textContent="Color";}
            if ((model.startsWith("BP")) && (model.charAt(5)="M")) {MFPtype.textContent="Monochrome";}
        };       // processing the device model if it is at the beginning of the line

// Serial Number: Remove the 2 zeroes padding the end, Sharp MFPs only use an 8 digit S/N         
     if (line.startsWith("Serial")) {

      let serNo = line.slice(14, -2);
      serNo.textContent = serNo.toString();
      console.log(`SerNo: ${serNo}`);
     }; 
    
      
     if (line.startsWith("Black & White Total Print Count")) {
        monoCount.textContent = line.slice(34, 43);

     }
               let mono = line.startsWith("Black & White Total Print Count");  // Black & White Total Print Count:  Followed by a ' = ' and a number from 2 to 7 digits
              // IF the MFP is a color machine them
               // Color Total Print Count:  same syntax as above
               // ** the two Total Print Counts MAY or MAY NOT be on the same line

     if (line.startsWith("Color Total Print Count")) {
        colorCount.textContent = line.slice(24, 33);
        
             }            

    
               let color = line.startsWith("Color Total Print Count");
             let tonerQuan = line.startsWith("Toner Residual"); // Low Toner Alert:
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
               let endRecordFlag = line.startsWith("-----");
               console.log(`After reading all lines in the record--SerNo: ${serNo}`);

      if ( mono || color || tonerQuan || endRecordFlag)    // Ready Gate w/ Ready Flags
                                                
 
      {  // THIS IS THE BIG OUTPUT AREA.  **CAN* WE GET OUTPUT PAST THIS JS??!   
        
        console.log(`Line ${index + 1}: ${line}`);       // Workin' Awesome

//       some kind of DOM output to the html goes here

} //end of the gate for Ready flags, end of output area


      if (endRecordFlag) {    // what to do at the end of each record signified by the dashed line delimiter "-----"
        console.log(`Date: ${dateTime}         Customer Name: ${custName} `);
        console.log(`Model: ${model} ....... MFP Type:  ${MFPtype} ...... Serial No: ${serNo}`);  //why no SerNo show?
        console.log(`Total Monochrome: ${monoCount}`);
        if (MFPtype = "Color") {console.log(`Total Color:  ${colorCount}`);}
        console.log ("Toner alerts for this record to display soon.");  
        console.log("End of record. Click Read File to process next record.");
        console.log("--------------------------------------------------------------");
       
       custName=""; model=""; 
       endUserVerify();  /// this is SOOO Broken. Won't pause 
       }          // end of processing actions for the dashed line delimiter "-----"

      
     } ; // end of checking for blank lines - line 88
}); // end of splitting off the lines from the string wad - line 81
   }       // End of loading the text fule into one string variable   (reader: onload) - Line 71

  
   // Read the file as text
      reader.readAsText(file);
      

    })  // End of Click to Proceed Reading the Text file
  } else {       // end of checking to see if the file is present
    console.log("No file selected.");


  }              // and this is the end of the catchall in case you cancel your file choice - Line 64  }              // and this is the end of the catchall in case you cancel your file choice - Line 64  }              // and this is the end of the catchall in case you cancel your file choice - Line 64
}); // End of the addeventlistener that selects the text file - Line 62

