import { toast } from "react-toastify";
import supabase from "./superBaseClient";

export async function insertObservation(itemFound, typeFile) {
  let from;
  switch (typeFile) {
    case "observation":
      from = "donor_observation";
      break;
    case "reference":
      from = "donor_reference";
      break;
    case "Telefone 2":
      from = "donor_tel_2";
      break;
    case "Telefone 3":
      from = "donor_tel_3";
      break;
    default:
      toast.error("Arquivo inválido");
  }
  const { error } = await supabase.from(from).insert(itemFound).select();
  if (error) throw error;
  if (!error) toast.success("Dados enviados com sucesso.");
}
