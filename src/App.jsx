import { useEffect, useState } from "react";
import "./App.css";
import CsvReader from "./components/CsvReader";
import { updateDataBase } from "./helper/updateDataBase";
import { ToastContainer } from "react-toastify";
import { compareDonationsWithDonors } from "./helper/compareDonationsWithDonors";
function App() {
  const [csvData, setCsvData] = useState([]);
  const [typeFile, setTypeFile] = useState();
  const [itemNotFound, setItemNotFound] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    CsvReader(file, setCsvData, setTypeFile);
  };

  const compare = () => {
    compareDonationsWithDonors(csvData, setItemNotFound);
  };

  const handleUpdate = () => {
    updateDataBase(typeFile, csvData);
  };

  return (
    <>
      <div>
        <h2>Leitor de CSV</h2>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        {csvData?.length > 0 && (
          <button onClick={compare}>( 1 ) Salvar verificando a existencia do doador</button>
        )}
        {csvData?.length > 0 && (
          <button onClick={handleUpdate}> ( 2 ) Salvar {typeFile}</button>
        )}

        <ToastContainer />
      </div>

      <div>
        {itemNotFound?.length > 0 && (
          itemNotFound.map((item, index) => (
            <p key={index}>{index}{item}</p>
          ))
        )}
      </div>
    </>
  );
}

export default App;
