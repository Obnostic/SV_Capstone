function dataParse(processString, lineRecord, indEx) {
  const dateTime = document.getElementById("date-n-time");
  const custName = document.getElementById("customer");
  const model = document.getElementById("mfp-model");
  const MFPtype = document.getElementById("mfp-type");
  const serNo = document.getElementById("ser-no");
  const monoCount = document.getElementById("b+w-total");
  const colorCount = document.getElementById("col-total");
  const tonerLow = document.getElementById("toner-low");

  let workString = processString;
  let modTxt = "";
  let startPos = 0;
  let endPos = 0;
  let colorFlag = false;
  let tonerLines = [];
  let tonerCount = 0;
  let tonerResultString = "";
  let tonerAlertAdded = false;

  for (let i = 0; i < 8; i++) {
    let arrString = keyPhrase[i];

    if (workString.startsWith(arrString)) {
      console.log(`MATCH!! ${workString}`);
      console.log(`Starting with array index ${indEx}`);

      switch (i) {
        case 0: // Date & Time
          dateTime.textContent = workString;
          lineRecord[indEx] = workString.toString();
          indEx++;
          break;

        case 1: { // Customer Name and Model
          let customerText = "";
          let modelText = "";

          let customerStartPos = 13;
          let modelIndex = workString.indexOf(keyPhrase[2]);

          if (modelIndex > 0) {
            customerText = workString.slice(customerStartPos, modelIndex - 1);
            let modelStartPos = modelIndex + keyPhrase[2].length + 2;
            modelText = workString.slice(modelStartPos).trim();
          } else {
            customerText = workString.slice(customerStartPos).trim();
          }

          custName.textContent = customerText;
          lineRecord[indEx] = customerText;
          indEx++;

          if (modelText) {
            model.textContent = modelText;
            lineRecord[indEx] = modelText;
            indEx++;

            let isMonochrome = false;
            if (modelText.startsWith("MX-M") || (modelText.startsWith("BP") && modelText.charAt(5) === "M")) {
              isMonochrome = true;
            }

            MFPtype.textContent = isMonochrome ? "Monochrome" : "Color";
            lineRecord[indEx] = isMonochrome ? "Monochrome" : "Color";
            indEx++;
          }
          break;
        }

        case 2: // Model at beginning of line
          startPos = 14;
          endPos = workString.length;
          modTxt = workString.slice(startPos, endPos);
          if (modTxt != null) {
            model.textContent = modTxt;
            lineRecord[indEx] = modTxt;
            indEx++;
          }
          if (modTxt.startsWith("MX-M") || (modTxt.startsWith("BP") && modTxt.charAt(5) === "M")) {
            MFPtype.textContent = "Monochrome";
            lineRecord[indEx] = "Monochrome";
            colorFlag = false;
            indEx++;
          } else {
            MFPtype.textContent = "Color";
            lineRecord[indEx] = "Color";
            colorFlag = true;
            indEx++;
          }
          break;

        case 3: // Serial Number
          serNo.textContent = workString.slice(15, -2);
          lineRecord[indEx] = workString.slice(15, -2);
          indEx++;
          break;

        case 4: { // B&W Total
          let monoText = "";
          let colorText = "";
          let colorTotalPhrase = "Color Total Print Count = ";
          let bwTotalPhrase = "Black & White Total Print Count = ";

          if (workString.includes(colorTotalPhrase)) {
            let bwStartPos = workString.indexOf(bwTotalPhrase) + bwTotalPhrase.length;
            let bwEndPos = workString.indexOf(" ", bwStartPos);
            if (bwEndPos === -1) bwEndPos = workString.indexOf(colorTotalPhrase);
            monoText = workString.slice(bwStartPos, bwEndPos).trim();

            let colorStartPos = workString.indexOf(colorTotalPhrase) + colorTotalPhrase.length;
            colorText = workString.slice(colorStartPos).trim();
          } else {
            let bwStartPos = workString.indexOf(bwTotalPhrase) + bwTotalPhrase.length;
            monoText = workString.slice(bwStartPos).trim();
            colorText = "pending";
          }

          monoCount.textContent = monoText;
          lineRecord[indEx] = monoText;
          indEx++;

          if (MFPtype.textContent === "Monochrome") {
            colorCount.textContent = "0";
            lineRecord[indEx] = "0";
            indEx++;
          } else if (colorText !== "pending") {
            colorCount.textContent = colorText;
            lineRecord[indEx] = colorText;
            indEx++;
          }
          break;
        }

        case 5: { // Color totals
          if (MFPtype.textContent === "Monochrome") {
            colorCount.textContent = "0";
            lineRecord[indEx] = "0";
            indEx++;
          } else {
            let colorTotalPhrase = "Color Total Print Count = ";
            if (workString.startsWith(colorTotalPhrase)) {
              let startPos = workString.indexOf(colorTotalPhrase) + colorTotalPhrase.length;
              let colorMeterText = workString.slice(startPos).trim();
              colorCount.textContent = colorMeterText;
              lineRecord[indEx] = colorMeterText;
              indEx++;
            } else {
              // Ensure color count is set, even if not found in current line.
              if (colorCount.textContent === "" || lineRecord[indEx] === undefined) {
                colorCount.textContent = "0";
                lineRecord[indEx] = "0";
                indEx++;
              }
            }
          }
          break;
        }

        case 0: // Date
        lineRecord[indEx] = processString;
        break;
    case 1: // Location
        lineRecord[indEx] = processString;
        break;
    case 2: // Model
        lineRecord[indEx] = processString;
        break;
    case 3: // Serial
        lineRecord[indEx] = processString;
        break;
    case 4: // Meter Reading
        lineRecord[indEx] = processString;
        break;
    case 5: // PO Number
        lineRecord[indEx] = processString;
        break;
        
    case 6: { // Toner Low/Urgent
        let lowToner = [];
        let urgentToner = [];
        if (!this.currentTonerLines) {
            this.currentTonerLines = [];
        }
    
        if (processString.includes("Toner Residual")) {
            this.currentTonerLines.push(processString);
        }
    
        let isMonochrome = (MFPtype.textContent === "Monochrome");
        let expectedLines = isMonochrome ? 1 : 4;
    
        if (this.currentTonerLines.length === expectedLines) {
            for (let tonerLine of this.currentTonerLines) {
                let match = tonerLine.match(/Toner Residual \((Bk|C|M|Y)\) = (.+)/);
                if (match) {
                    let colorCode = match[1];
                    let value = match[2].trim();
                    let low = false;
                    let urgent = false;
    
                    if (value.includes("-")) {
                        let rangeValues = value.split("-");
                        let lower = parseInt(rangeValues[0]);
                        if (lower <= 25) low = true;
                        if (lower < 10) urgent = true;
                    } else {
                        let percentage = parseInt(value);
                        if (percentage < 25) low = true;
                        if (percentage < 10) urgent = true;
                    }
    
                    if (low) lowToner.push(colorCode);
                    if (urgent) urgentToner.push(colorCode);
                }
            }
    
            let resultString = "";
            if (lowToner.length > 0) {
                resultString += "Low: " + lowToner.join(", ");
            }
            if (urgentToner.length > 0) {
                if (resultString) resultString += "          Urgent: " + urgentToner.join(", ");
                else resultString += "Urgent: " + urgentToner.join(", ");
            }
    
            // Always store a value (even empty) in the cell
            lineRecord[indEx] = resultString;
            tonerLow.textContent = resultString;
            tonerAlertAdded = true;
    
            this.currentTonerLines = [];
        } else if (!processString.includes("Toner Residual")) {
            this.currentTonerLines = [];
        }
        break;
    }



        case 7: // Record End Delimiter
          if (!tonerAlertAdded) {
            lineRecord[indEx] = "";
            indEx++;
          }
          lineRecord[indEx] = "-----";
          indEx++;
          break;
        default:
          console.log(`Function for ${keyPhrase[i]} not yet implemented.`);
      }
    }
  }
  return { lineRecord, indEx };
}