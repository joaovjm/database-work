import supabase from "./superBaseClient";

export async function compareDonations(csvData) {
  const csvDataSet = csvData.map((csv) => csv.receipt_donation_id);
    let donations;
    let notIn = [];
  try {
    const { data, error } = await supabase
      .from("donation")
      .select()
      .eq("collector_code_id", "22")
      .gte("donation_day_received", "2024-08-01")
      .lte("donation_day_received", "2024-12-31");
    if (error) throw error;
    if (!error) donations = data

    csvDataSet.forEach((item) => {
        const compare = donations.some(d => d.receipt_donation_id === Number(item))
        if(!compare){
            notIn.push(item)
        }
    })

    console.log(notIn)
  } catch (error) {
    console.log("Erro: ", error.message);
  }
}
