import Papa from "papaparse";

const CsvReader = (file, setCsvData, setTypeFile) => {
  if (file) {
    Papa.parse(file, {
      header: true, // Se o CSV tiver cabeçalho
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
        if(results.data[0].donor_tel_2){
          setTypeFile("Telefone 2")
        } else if (results.data[0].donor_tel_3){
          setTypeFile("Telefone 3")
        } else if (results.data[0].donor_cpf){
          setTypeFile("cpf")
        } else if (results.data[0].donor_observation){
          setTypeFile("observation")
        } else if (results.data[0].donor_reference){
          setTypeFile("reference")
        } else if (results.data[0].donor_type){
          setTypeFile("Donator")
        } else if (results.data[0].donor_mensal_monthly_fee){
          setTypeFile("Dados do mensal")
        } else if (results.data[0].donation_day_received){
          setTypeFile("Doações")
        }
      },
      error: (error) => {
        console.error("Erro ao processar CSV:", error);
      },
    });
  }
};

export default CsvReader;
