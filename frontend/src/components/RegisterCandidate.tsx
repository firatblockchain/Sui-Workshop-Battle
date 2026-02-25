import React, { useState } from "react";
import { useSignAndExecuteTransaction, useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { PACKAGE_ID } from "../constants";
import { createJoyTx } from "../utility/transactions";
import { Loader2, PlusCircle } from "lucide-react";

export function RegisterCandidate({ refreshKey, setRefreshKey }: { refreshKey: number, setRefreshKey: (key: number) => void }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const account = useCurrentAccount();
  const suiClient = useSuiClient();

  const handleRegister = async () => {
    if (!account) return alert("Lütfen önce cüzdanınızı bağlayın!");
    if (!name || !url) return alert("Lütfen tüm alanları doldur!");

    setIsPending(true);
    const tx = createJoyTx(PACKAGE_ID, name, url);

    signAndExecute({ transaction: tx as any }, {
      onSuccess: async ({ digest }) => {
        await suiClient.waitForTransaction({ digest });
        setName("");
        setUrl("");
        setIsPending(false);
        setRefreshKey(refreshKey + 1);
        alert("Joy Başarıyla Oluşturuldu! 🚀");
      },
      onError: (err) => {
        setIsPending(false);
        alert("Hata: " + err.message);
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3 w-full items-center">
      <input
        placeholder="Adınız"
        className="w-full lg:flex-1 bg-slate-950/50 border border-slate-700/50 p-4 rounded-2xl outline-none focus:border-cyan-500 transition-all text-sm text-white"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Resim URL (https://...)"
        className="w-full lg:flex-[2] bg-slate-950/50 border border-slate-700/50 p-4 rounded-2xl outline-none focus:border-cyan-500 transition-all text-sm text-white"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <button
        onClick={handleRegister}
        disabled={isPending}
        className="w-full lg:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
      >
        {isPending ? <Loader2 className="animate-spin" size={20} /> : <PlusCircle size={20} />}
        {isPending ? "YÜKLENİYOR..." : "YÜKLE"}
      </button>
    </div>
  );
}