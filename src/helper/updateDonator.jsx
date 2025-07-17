import { toast } from "react-toastify";
import supabase from "./superBaseClient";

export async function updateDonator(csvData, chunkSize = 900) {
  const totalChunks = Math.ceil(csvData.length / chunkSize);
  let currentChunk = 0;

  // Inicia o toast de carregamento
  const toastId = toast.loading(`🔄 Processando dados... 0%`);

  for (let i = 0; i < csvData.length; i += chunkSize) {
    const smallCsvData = csvData.slice(i, i + chunkSize);

    const { error } = await supabase
      .from("donor")
      .upsert(smallCsvData, {
        onConflict: ["donor_id"],
        ignoreDuplicates: true,
      });

    currentChunk++;

    if (error) {
      toast.update(toastId, {
        render: `❌ Erro no bloco ${currentChunk}: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      console.error("Erro no chunk:", currentChunk, error);
      return;
    } else {
      const progress = Math.round((currentChunk / totalChunks) * 100);
      toast.update(toastId, {
        render: `📦 Processando dados... ${progress}%`,
        isLoading: true,
      });
    }
  }

  toast.update(toastId, {
    render: "✅ Todos os dados foram enviados com sucesso!",
    type: "success",
    isLoading: false,
    autoClose: 4000,
  });
}