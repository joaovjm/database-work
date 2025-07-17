import { toast } from "react-toastify";
import supabase from "./superBaseClient";

export async function updateDataBase(typeFile, itemFound) {
  let table;
  let method = "insert";
  let countLoading = 0;
  const itens = 900;

  const toastID = toast.loading("Enviando doações... 0%");
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
      method = "upsert";
      break;
    case "Doações":
      table = "donation";
      method = "upsert";
      break;
    case "Dados do mensal":
      table = "donor_mensal";
      method = "upsert";
    default:
      table = "donation"
      method = "update"
  }

  try {
    for (let i = 0; i < itemFound.length; i += itens) {
      const smallItemFound = itemFound.slice(i, i + itens);
      let query = supabase
        .from(table)
        [method](smallItemFound, {
          onConflict: ["receipt_donation_id"],
        })
        .select();
      const { error } = await query;

      countLoading += smallItemFound.length;

      if (error) {
        toast.update(toastID, {
          render: `Erro ao enviar o dado ${countLoading}: ${error.message}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
        return;
      } else {
        const loading = Math.round((countLoading / itemFound.length) * 100);
        toast.update(toastID, {
          render: `Enviando doações... ${loading}%`,
          isLoading: true,
        });
      }
    }

    toast.update(toastID, {
      render: `Dados enviados com sucesso! `,
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
  } catch (error) {
    console.log(error);
  }
}
