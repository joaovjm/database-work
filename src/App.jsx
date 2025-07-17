import { useEffect, useState } from "react";
import "./App.css";
import CsvReader from "./components/CsvReader";
import { updateDataBase } from "./helper/updateDataBase";
import { ToastContainer } from "react-toastify";
import { compareDonationsWithDonors } from "./helper/compareDonationsWithDonors";
<<<<<<< HEAD
import { updateDonator } from "./helper/updateDonator";
import 'react-toastify/dist/ReactToastify.css';
import { compareDonations } from "./helper/compareDonations";
import { updateDonations } from "./helper/updateDonations";
=======
import { updateMensal } from "./helper/updateMensal";
>>>>>>> 85841b9bd6977627c0d505e9be6fe1320fc250da
function App() {
  const [csvData, setCsvData] = useState([]);
  const [typeFile, setTypeFile] = useState();
  const [itemNotFound, setItemNotFound] = useState([]);
  const [itemFound, setItemFound] = useState([])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    CsvReader(file, setCsvData, setTypeFile);
  };

  const compare = () => {
    //compareDonationsWithDonors(csvData, setItemFound, setItemNotFound, typeFile);
    //compareDonations(csvData)
  };

<<<<<<< HEAD
  const handleUpdate = async () => {
    //await updateDonator(csvData, 900)
    //await updateDataBase(typeFile, itemFound);
    updateDonations(csvData, 500, 300)
=======
  const handleUpdate = () => {
    //updateDataBase(typeFile, csvData);
    updateMensal(csvData)
>>>>>>> 85841b9bd6977627c0d505e9be6fe1320fc250da
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

      {/* <div>
        {itemNotFound?.length > 0 && (
          itemNotFound.map((item, index) => (
            <p key={index}>{index}: {item}</p>
          ))
        )}
      </div> */}
    </>
  );
}

export default App;
