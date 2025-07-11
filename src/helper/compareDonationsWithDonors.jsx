import { toast } from "react-toastify";
import supabase from "./superBaseClient";

export async function compareDonationsWithDonors(csvData, setItemNotFound) {
  try {
    let itemNotFound = [];
    let countFound = 0;
    let countNotFound = 0;

    const csvDataMap = [...new Set(csvData.map(ids => ids.donor_id))];

    const { data: existingData } = await supabase
      .from("donor")
      .select("donor_id")
      .in("donor_id", csvDataMap);
    const existingDataId = new Set(existingData.map(id => id.donor_id) || []);

    for (const item of csvData) {
      if (existingDataId.has(Number(item.donor_id))) {
        const { error } = await supabase.from("donation").insert(item);
        if (!error) countFound += 1
      } else {
        itemNotFound.push(item.donor_id);
        countNotFound += 1;
      }
    }
    setItemNotFound(itemNotFound)
    toast.success(`${countFound} dados atualizados com sucesso. E ${countNotFound} Doadores não existem`)
  } catch (error) {
    console.error(error);
  }
}
