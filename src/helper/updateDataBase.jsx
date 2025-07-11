import { toast } from "react-toastify";
import supabase from "./superBaseClient";

export async function updateDataBase(typeFile, csvData) {
  let table;
  let method = "insert";

  switch (typeFile) {
    case "Telefone 2":
      table = "donor_tel_2";
      break;
    case "Telefone 3":
      table = "donor_tel_3";
      break;
    case "cpf":
      table = "donor_cpf";
      break;
    case "observation":
      table = "donor_observation";
      break;
    case "reference":
      table = "donor_reference";
      break;
    case "Donator":
      table = "donor";
      break;
    case "Doações":
      table = "donation";
      method = "upsert";
      break;
    case "Dados do mensal":
      table = "donor_mensal";
      method = "upsert";
    default:
      throw new Error("Dados não compatíveis com o desejado.");
  }

  try {
    let query = supabase.from(table)[method](csvData).select();
    const { data, error } = await query;
    console.log(data);
    if (error) throw error.message;
    if (!error) toast.success("Dados enviados com sucesso!");
  } catch (error) {
    console.log(error);
  }
}
