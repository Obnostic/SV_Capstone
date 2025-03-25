// Excel JS module



// const ExcelJS = require('C:/Windows/System32/node_modules/exceljs/');

import exceljs from "file:///C:/Windows/System32/node_modules/exceljs/excel.js";

//const response = await fetch("file:///C:/Users/Standard/Documents/git/package.json");
 //     const json = await response.json();

const workbook = new ExcelJS.Workbook();
// const workbook = createAndFillWorkbook();

const sheet = workbook.addWorksheet('MFP DATA', {views:[{state: 'frozen', xSplit: 1}]});    // , ySplit:1


worksheet.getCell('A1').value = "FOO";
worksheet.getCell('A2').value = "BAR";
worksheet.getCell('A3').value = "SPLAT";
worksheet.getCell('A4').value = "BOOM";
worksheet.getCell('A5').value = "CRUNCH";

worksheet.commit();
await workbook.xlsx.writeFile('../SV_Capstone/output/result.xlsx');