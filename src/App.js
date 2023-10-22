import { useState, useEffect } from 'react';
import handleExcel from './export';
import handleImport from './import';

function App() {
  const [file, setFile] = useState(null);
  useEffect(() => {
    if (file) {
      handleImport(file);
    }
  }, [file]);

  return (
    <div className="App">

      <p>Modify import.js file for your desire Excel</p>
      <input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files[0])} />
      <p>Modify export.js file for your desire Excel</p>
      <button onClick={(e) => handleExcel(null, true)}> Click to download Excel</button>
      <p>View your excel</p>
      <button onClick={(e) => handleExcel(null, false)}> Click to View Excel</button>
    </div>
  );
}

export default App;
