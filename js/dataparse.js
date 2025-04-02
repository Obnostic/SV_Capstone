
async function dataParse (processString, lineRecord, indEx)  {

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



//remove checking out or processing blank lines
       // Workin' Awesome
let workString = processString;

// THIS IS THE BIG OUTPUT AREA.  **CAN* WE GET OUTPUT PAST THIS JS??!   

console.log(`Received: ${workString}`);  /// working, shows the line without the index number
//       some kind of DOM output to the html goes here






for (let i = 0; i < 8; i++) {  // Run each line through the option of choices      // console.log(stVar.toString()); (useful)
  console.log(`Pattern run ${i}`);               // index value as the string array is accessed
  let arrString = keyPhrase[i];  // pass the string array value to a temp var - protect the array
  console.log(`Array selection: ${arrString}`);
  console.log(`WorkPhrase: ${workString}`);





if (workString.startsWith(arrString)) {
  console.log(`Starting with array index ${indEx}`);
  switch (i) {
    case 0:
      dateTime.textContent = workString;              // output to html
      lineRecord[indEx]=(workString.toString());
// output dateTime to JSON
      break;

    case 1:            
      startPos = 13;
      endPos = workString.length;
      let custText = workString.slice(startPos, endPos); 
      custName.textContent = custText;
      lineRecord[indEx]=(workString.toString());
      if (workString.indexOf(keyPhrase[2])>0) {    // Processing the model number
         console.log("Model number is present on the same line as the customer's ID");
         startPos = (workString.indexOf(keyPhrase[2])+14);
         endPos = workString.length; 
         model.textContent = workString.slice(startPos, endPos);
         lineRecord[indEx] = workString.slice(startPos, endPos);
         custName.textContent = custName.textContent.slice(0,startPos);
         lineRecord[indEx-1] = custName.textContent.slice(0,startPos);
         if (model.textContent.startsWith("MX-M")) {
           MFPtype.textContent="Monochrome";
           lineRecord[indEx] = "Monochrome";
            colorFlag=false; } 
           else {MFPtype.textContent="Color";
            lineRecord[indEx] = "Color";
            colorFlag=true; }
         if ((model.textContent.startsWith("BP")) && (model.charAt(5)=="M")) 
           {MFPtype.textContent="Monochrome";
            lineRecord[indEx] = "Monochrome";
            colorFlag=false;} 
           
      }   // End of  checking if the Device Name line has a Model Number
      break; // End Case 1

    case 2:          // if the device model is at the beginning of the line  
       startPos = 14;
       endPos = workString.length;
       modTxt = workString.slice(startPos, endPos);
       if (modTxt != null) {model.textContent = modTxt;
          lineRecord[indEx] = modTxt;}
       console.log(`modTxt: ${modTxt}`);
       if (modTxt.startsWith("MX-M")) {
          MFPtype.textContent="Monochrome";
          lineRecord[indEx]="Monochrome";
          colorFlag = false;
        } else {  MFPtype.textContent="Color";
          lineRecord[indEx]="Color";
          colorFlag=true;   }
       if ((modTxt.startsWith("BP")) && (modTxt.charAt(5)=="M")) {
          MFPtype.textContent="Monochrome";
          lineRecord[indEx]="Monochrome";
          colorFlag = false; }
       break; // End Case 2

    case 3: // Remove the padded 0's from the end of the S/N
       serNo.textContent = workString.slice(14, -2);
       lineRecord[indEx]= workString.slice(14, -2);
       break;  // End Case 3        

    case 4:  // B&W Total - Col Total may be on same line
        lineRecord[indEx]="4-B&W";
        monoCount.textContent= "4-B&W";
        break; // End Case 4

    case 5:
      if (colorFlag) {
        lineRecord[indEx]="5-Color#";
        colorCount.textContent= "5-Color#";
      } else lineRecord[indEx]="";
      break;

    case 6:
       lineRecord[indEx]="toner";
       tonerLow.textContent = "6-TonerBK#";
       tonerVLow.textContent = "6 VLowBK#";
       if (colorFlag) {
        tonerLow.textContent ="6-Toner KCMY";
        tonerVLow.textContent = "6 VLowKCMY";
      }
      break;

    case 7:
      lineRecord[indEx]="-----"; 
      
    default:
      console.log(`Function for ${keyPhrase[i]} not yet implemented.`);
     
  } //end switch case   
  indEx++;
} //end of string matching
} // end of parsing the line to compare with array elements

//  END OF TEXT PROCESSING AND CONVERSION 

return lineRecord, indEx;
}  // end of subroutine DataParse
