/**
 * Creates an Excel spreadsheet (XLSX) and saves it to the user's "My Documents" folder.
 *
 * **Important:**
 * 1.  This code relies on browser features for saving files, which typically works in a browser environment
 * (like a web page running in Chrome, Firefox, etc.).  It won't work in Node.js directly unless you modify
 * it to use server-side file system access.
 * 
 * 2.  Browsers often have security restrictions that prevent direct access to the file system
 *  (including "My Documents").  This code will likely trigger a file download prompt where the user
 *  chooses the save location.
 * 
 * 3.  This uses the `xlsx` library, which you must include in your HTML file (see example usage).
 *
 * @param {Array<Array<any>>} data - 2D array representing the spreadsheet data.
 * @param {string} filename - The name of the file to save (without extension).  Defaults to "spreadsheet".
 * @param {string} sheetName - The name of the sheet in the spreadsheet. Defaults to "Sheet1".
 */
function createAndSaveExcel(data, filename = "spreadsheet", sheetName = "Sheet1") {
    try {
      // 1. Create a workbook
      const wb = XLSX.utils.book_new();
  
      // 2. Create a worksheet
      const ws = XLSX.utils.aoa_to_sheet(data);
  
      // 3. Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
      // 4. Generate the XLSX file as a binary string
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  
      // 5. Convert the binary string to a Blob (Binary Large Object)
      function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }
  
      const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  
      // 6. Trigger the download
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "Save As" dialog
        window.navigator.msSaveBlob(blob, filename + ".xlsx");
      } else {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename + ".xlsx";  // Set the filename
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
      }
  
  
    } catch (error) {
      console.error("Error creating and saving Excel file:", error);
      alert("Failed to create and save the Excel file. See console for details."); // Provide user feedback
    }
  }
  