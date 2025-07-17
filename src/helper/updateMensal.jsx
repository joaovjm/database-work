import { toast } from "react-toastify";
import supabase from "./superBaseClient";

export async function updateMensal(csvData) {
  let count = 0;
  let csvDataWithId = [];
  const getIdDonor = async (csv) => {
    const { data: getID } = await supabase
      .from("donor")
      .select("donor_id, donor_name")
      .eq("donor_name", csv.donor_name)
      .eq("donor_tel_1", csv.donor_tel_1)
      .eq("donor_type", "Avulso");

    return getID;
  };

  for (const csv of csvData) {
    count++;
    console.log(count);
    const response = await getIdDonor(csv);
    const { error: updateError } = await supabase
      .from("donor")
      .update({ donor_type: "Mensal" })
      .eq("donor_id", response[0].donor_id)

        if(updateError) console.error(updateError)
  }

  //   const { data: updateMonth, error: updateError } = await supabase
  //     .from("donor")
  //     .upsert(csvDataWithId, {onConflict: ["donor_id"]})
  //     .select()
  //   if (updateError)
  //     toast.error("Erro ao atualizar doadores mensais.", updateError.message);
  //   if (updateMonth) toast.success("Mensal atualizado com sucesso");
  //   console.log(csvDataWithId);
  //   const { data, error } = await supabase.from("donor_mensal").upsert();
}
