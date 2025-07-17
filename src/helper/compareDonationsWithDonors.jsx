import supabase from "./superBaseClient";

export async function compareDonationsWithDonors(csvData, setItemFound, setItemNotFound, typeFile) {
  const chunkFile = 900;
  let countFound = 0;
  let countNotFound = 0;
  let itemFound = [];
  let itemNotFound = [];
  if (typeFile === "Donator") {
    setItemFound(csvData)
  } else {
    try {
      const allExistingIds = new Set();
      const csvDataMap = [...new Set(csvData.map(ids => ids.donor_id))];
      for (let i = 0; i < csvDataMap.length; i += chunkFile) {
        const chunk = csvDataMap.slice(i, i + chunkFile)
        const { data: existingData, error: errorData } = await supabase
          .from("donor")
          .select("donor_id")
          .in("donor_id", chunk);

        if (errorData) {
          console.log(errorData.message)
        } else {
          existingData.forEach(item => allExistingIds.add(item.donor_id))
        }
      }
      for (const item of csvData) {
        if (allExistingIds.has(Number(item.donor_id))){
          itemFound.push(item)
          countFound += 1
        } else {
          itemNotFound.push(item.donor_id)
          countNotFound += 1
        }
      }
      console.log(itemFound)
      console.log(itemNotFound)

      setItemNotFound(itemNotFound)
      setItemFound(itemFound)
    } catch (error) {
      console.error(error);
    }
  }

}
