import React from 'react'

const ExportExcel = () => {

  let downloadExcel = (fileName, content) => {
    let a = document.createElement('a');
    let blob = new Blob([content], { type: 'text/plain' });
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.click();
  }

  let viewExcel = (fileName, content) => {
    let a = document.createElement('a');
    let file = new Blob([content], { type: 'application/xlsx' });

    const url = window.URL.createObjectURL(new Blob([new Uint8Array(content).buffer], { type: 'text/plain' }));
    /// window.URL.createObjectURL(file)
    window.open(url, "_blank");
  }

  let handleExcel = (workbook, download = false) => {
    if (!workbook) {
      workbook = new ExcelJS.Workbook();
    }
    createExcel(workbook);
    workbook.xlsx.writeBuffer().then((buffer) => {
      if (download) downloadExcel(`test.xlsx`, buffer);
      else viewExcel(`test.xlsx`, buffer);
    });
  }

  let createExcel = (wb) => {
    const ws = wb.addWorksheet('My Sheet');
    ws.autoFilter = 'A1:C3';

    const headers = [
      { header: 'Column1', key: 'col1', width: 15 },
      { header: 'Column2', key: 'col2', width: 15 },
      { header: 'Column3', key: 'col3', width: 15 },
      { header: 'Column4', key: 'col4', width: 15 },
      { header: 'Column5', key: 'col5', width: 15 }
    ];

    ws.columns = headers;

    ws.addRows([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20]
    ]);

    const v0 = ws.getCell('A1').value;
    console.log(v0);

    const v1 = ws.getCell(2, 3).value;
    console.log(v1);

    const r1 = ws.getRow(1).values;
    console.log(r1);

    let rows = ws.getRows(1, 2).values();
    for (let row of rows) {
      row.eachCell((cell, cn) => {
        console.log('row value', cell.value);
      });
    }

    const name = ws.getColumn('col5').values;
    console.log('name', name);
  }
  return (
    <div>export</div>
  )
}
