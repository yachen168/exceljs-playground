import ExcelJS from 'exceljs';

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

export default handleImport;