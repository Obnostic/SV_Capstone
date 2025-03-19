
// Capstone Data Parser
// Read a text file of Sharp MFP Statistics Reports
// Parse to gather selected data and create and Excel file
// ExcelJS is the API


const fileInput = document.getElementById('fileInput');
const fileContent = document.getElementById('fileContent');
const textLineOutput = document.getElementById("text-line-output");
const readout = textLineOutput.elements["read-out"];


function updateResult() {
  readout.value = data;
}

let modelResult="";
let serResult=0;
let colorResult=0;

//const fs = require('fs');
//const outPutObject = {
//  dateObj: dateLine,
//  nameObj: custField,
 // modelObj: modelResult,
//  serObj: serResult,
//  monoCt: monoResult,
  // colorMFP: { if (colorFlag) {"Y"} else {"N"}},
//  colorCt: colorResult
//  tonerRemain: {
 //   if (!colorflag) {"B"+standby} else {
 //       "C"+Ccritical+"   M"+Mcritical+"    Y"+critical
 //   }
 // }
// };

//const stringForJSON = JSON.stringify(outPutObject,null);
//fs.writeFileSync('mydata.json', myJSONString);



function endUserVerify() {
  
  fileContent.addEventListener ('change', function(event) { 
     // proceed after acknowledging end record delimiter "-----"
    // event.target.disabled = false;
  });  // End Onclick Permission to Process
}  // End function endUserVerify


//function parseModel(txt,cFlag,modelResult) {}
//function trimSerial(txt,serResult) {}
//function colorTally(txt,cFlag,colorResult) {}
//function monoTally(txt,cFlag,monoResult) {}
//function lowTonerAlert(txt,whichTC,cFlag,quanResult) {}



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
    let colorFlag = false;
    let tcIndicator = "";   
    
    // Output each line to the console
    lines.forEach((line, index) => {
      
      if (line.length > 1)  {
            // here's where we start pulling only the data we need.
            //   I will overwrite and mindlessly repeat the same code, then consolidate
            // search the text for the following data:
            // Date in the format YYYY/MM/DD
            let date = line.startsWith("2025");
            // Device Name:
            // Device Model:  Parse to determine if this is a Monochrome or Color Machine
            let custName = line.startsWith("Device Name");
            let model = line.startsWith("Device Model");
            // Both Device Name and Model MAY or MAY NOT be on the same line
            // Serial Number: Remove the 2 zeroes padding the end, Sharp MFPs only use an 8 digit S/N
            let serial = line.startsWith("Serial");
            // Black & White Total Print Count:  Followed by a ' = ' and a number from 2 to 7 digits
            let mono = line.startsWith("Black & White Total Print Count");
            // IF the MFP is a color machine them
            // Color Total Print Count:  same syntax as above
            // ** the two Total Print Counts MAY or MAY NOT be on the same line
            let color = line.startsWith("Color Total Print Count");
            // Finally , Low Toner Alert:
            // For monochrome, it's Toner Residual (Bk)
            // For Color, it's Toner Residual each of C,M,Y
            // Sometimes they are listed as Percentages, sometimes as Ranges
            // For each color, if the Percentage is below 25%, alert the end user to have a backup ready
            // if the RANGE is 0%-25%, alert the end user to have a backup ready
            // if the Percentage is 10% or less, tell the enduser that their toner is ALMOST OUT
            // Otherwise don't mention toner amounts at all
            let tonerQuan = line.startsWith("Toner Residual");
            // The oblect is to display the valid information in the browser, and wait for the end user to push a button to confirm.
            // Then we will use a SQL API to feed the information into a spreadsheet
            // Finally, reading the delimiter "-----" should pause processing
            // ... and allow the enduser to review and approve to continue.
            let endRecordFlag = line.startsWith("-----");

            if (date || custName || model || serial || mono || color || tonerQuan || endRecordFlag)
            { //if (model) {parseModel(line, colorFlag,modelResult);}
              //if (serial) {trimSerial(line,serResult);}
              //if (mono) {monoTally(line,colorFlag,monoResult);}
              //if (color) {colorTally(line,colorFlag,colorResult);}
              //if (tonerQuan) {lowTonerAlert(line,tcIndicator,colorFlag,quanResult);}
              
              
              console.log(`Line ${index + 1}: ${line}`); 
              updateResult();
            } //end if combo
      } //end skip blank lines
    }); //end of processing each line
              }

              


            if (endRecordFlag) {
              console.log(`End of record. Click Read File to process next record.`);
              colorFlag = false;
              endUserVerify(); }

         // Read the file as text
          reader.readAsText(file);
          }); // end of wait for click on Read File before proceeding
        } else {
          console.log("No file selected.");
          }
      }  // end of test if file exists or not
    
    ); // end of go get the file

