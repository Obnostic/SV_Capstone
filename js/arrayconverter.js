function generateExcel(lineRecord) {
  let arrayLength = lineRecord.length;
  console.log(`Length of the array: ${arrayLength}`);
  console.log(`how many rows?  ${arrayLength / 9}`);
  let remainder = arrayLength % 9;
  let padding = 9 - remainder;

  for (let z = 1; z <= padding; z++) {
    lineRecord[arrayLength + z - 1] = "";
  }

  let newArrayLength = lineRecord.length;
  let rows = newArrayLength / 9;
  console.log(`Length of the array: ${newArrayLength}`);
  console.log(`how many rows?  ${rows}`);

  // Create header row
  const headerRow = [
    "Date/Time",
    "Name",
    "Model",
    "MFP Type",
    "Ser. No.",
    "B&W Total",
    "Color Total",
    "Low Toner Alert",
    "End Record",
  ];

  let reshapedData = reshapeArray(lineRecord, rows);

  // Add header row to the beginning of reshapedData
  reshapedData.unshift(headerRow);

  createAndSaveExcel(reshapedData, "SV_Result_Spreadsheet", "MFP Stats");
}

function reshapeArray(lineRecord, rows) {
  const columns = lineRecord.length / rows;
  const reshapedArray = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      row.push(lineRecord[i * columns + j]);
    }
    reshapedArray.push(row);
  }

  return reshapedArray;
}