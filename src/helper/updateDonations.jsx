import { toast } from "react-toastify";
import supabase from "./superBaseClient";

// Função para aguardar um tempo (em ms)
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function updateDonations(csvData, chunkSize = 500, delayMs = 300) {
  let updatedCount = 0;
  const toastID = toast.loading("Atualizando os dados... 0%");

  for (let i = 0; i < csvData.length; i += chunkSize) {
    const chunk = csvData.slice(i, i + chunkSize);

    const promises = chunk.map(async (item) => {
      const { error } = await supabase
        .from("donation")
        .update({
          donation_extra: item.donation_extra,
          donation_description: item.donation_description,
          donation_monthref: item.donation_monthref !== "" ? item.donation_monthref : null,
        })
        .eq("receipt_donation_id", item.receipt_donation_id);

      updatedCount++;

      const progress = Math.round((updatedCount / csvData.length) * 100);
      toast.update(toastID, {
        render: `Atualizando dados... ${progress}%`,
        isLoading: true,
      });

      if (error) {
        console.error(`Erro no ID ${item.receipt_donation_id}:`, error.message);
      }
    });

    await Promise.all(promises);

    // Aguarda um intervalo antes de processar o próximo chunk
    if (i + chunkSize < csvData.length) {
      await delay(delayMs); // Ex: espera 300ms entre chunks
    }
  }

  toast.update(toastID, {
    render: "✅ Todos os dados foram atualizados com sucesso!",
    type: "success",
    isLoading: false,
    autoClose: 4000,
  });
}