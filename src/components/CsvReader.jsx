import React, { useState } from 'react';
import Papa from 'papaparse';
import supabase from '../helper/superBaseClient';

const CsvReader = () => {
  const [csvData, setCsvData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true, // Se o CSV tiver cabeçalho
        skipEmptyLines: true,
        complete: (results) => {
          setCsvData(results.data);
          console.log('Dados CSV:', results.data);
        },
        error: (error) => {
          console.error('Erro ao processar CSV:', error);
        },
      });
    }
  };

  const handleupdate = async () => {
    const {data, error} = await supabase.from("donator_legacy").insert(csvData);
    if (error) {
      console.error(error);
    }
    if (!error) {
        console.log("Sucesso!")
    }
  }

  return (
    <div>
      <h2>Leitor de CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {csvData.length > 0 && (
        <button onClick={handleupdate}>Salvar</button>
      )}
      {/* <pre>{JSON.stringify(csvData, null, 2)}</pre> */}
    </div>
  );
};

export default CsvReader;