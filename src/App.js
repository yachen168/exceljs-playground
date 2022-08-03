import { useState, useEffect } from 'react';
import ExcelJS from 'exceljs';

// const wb = new ExcelJS.Workbook();
// const ws = wb.addWorksheet('My Sheet');
// ws.autoFilter = 'A1:C3';

// const headers = [
//   { header: 'Column1', key: 'col1', width: 15 },
//   { header: 'Column2', key: 'col2', width: 15 },
//   { header: 'Column3', key: 'col3', width: 15 },
//   { header: 'Column4', key: 'col4', width: 15 },
//   { header: 'Column5', key: 'col5', width: 15 }
// ];

// ws.columns = headers;

// ws.addRows([
//   [1, 2, 3, 4, 5],
//   [6, 7, 8, 9, 10],
//   [11, 12, 13, 14, 15],
//   [16, 17, 18, 19, 20]
// ]);

// const v0 = ws.getCell('A1').value;
// console.log(v0);

// const v1 = ws.getCell(2, 3).value;
// console.log(v1);

// const r1 = ws.getRow(1).values;
// console.log(r1);

// let rows = ws.getRows(1, 2).values();
// for (let row of rows) {
//   row.eachCell((cell, cn) => {
//     console.log('row value', cell.value);
//   });
// }

// const name = ws.getColumn('col5').values;
// console.log('name', name);

// wb.xlsx.writeBuffer().then((buffer) => {
//   writeFile(`test.xlsx`, buffer);
// });

function writeFile(fileName, content) {
  let a = document.createElement('a');
  let blob = new Blob([content], { type: 'text/plain' });

  a.download = fileName;
  a.href = URL.createObjectURL(blob);

  a.click();
}

function handleImport(file) {
  const wb = new ExcelJS.Workbook();
  const reader = new FileReader();

  reader.readAsArrayBuffer(file);
  reader.onload = () => {
    const buffer = reader.result;
    wb.xlsx.load(buffer).then((workbook) => {
      workbook.eachSheet((sheet, id) => {
        sheet.autoFilter = 'A1:C3';
        console.log('filterSheet', sheet);

        sheet.eachRow((row, rowIndex) => {
          console.log(row.values, rowIndex);
        });
      });
    });
  };
}

function App() {
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      handleImport(file);
    }
  }, [file]);

  return (
    <div className="App">
      <input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files[0])} />
    </div>
  );
}

export default App;
