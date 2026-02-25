import React, { useState } from "react";
import { useSuiClientQuery, useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { PACKAGE_ID } from "../constants";
import { voteTx, delistTx } from "../utility/transactions";
import { ThumbsUp, Trash2, Loader2 } from "lucide-react";
import { RefreshProps } from "../types/joy";

export function Leaderboard({ refreshKey, setRefreshKey }: RefreshProps) {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const [isVoting, setIsVoting] = useState<{ [key: string]: boolean }>({});
  const [isDelisting, setIsDelisting] = useState<{ [key: string]: boolean }>({});
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  // Admin Kontrolü
  const { data: adminCap } = useSuiClientQuery("getOwnedObjects", {
    owner: account?.address as string,
    filter: { StructType: `${PACKAGE_ID}::admin::AdminCap` }
  }, { enabled: !!account });

  const isAdmin = (adminCap?.data?.length ?? 0) > 0;
  const adminCapId = adminCap?.data?.[0]?.data?.objectId;

  // Listelenen Joy'ları getir
  const { data: listedEvents } = useSuiClientQuery("queryEvents", {
    query: { MoveEventType: `${PACKAGE_ID}::hub::JoyListed` },
    order: "descending"
  }, { refetchInterval: 1000 });

  const listedJoyIds = listedEvents?.data?.map(e => (e.parsedJson as any).list_joy_id) || [];

  const { data, isLoading } = useSuiClientQuery("multiGetObjects", {
    ids: listedJoyIds,
    options: { showContent: true }
  }, { enabled: listedJoyIds.length > 0 });

  const handleVote = (listJoyId: string) => {
    if (!account) return alert("Oy vermek için cüzdan bağlamalısın!");
    setIsVoting(prev => ({ ...prev, [listJoyId]: true }));

    const tx = voteTx(PACKAGE_ID, listJoyId);

    signAndExecute({ transaction: tx as any }, {
      onSuccess: async ({ digest }) => {
        await suiClient.waitForTransaction({ digest });
        alert("Oyun başarıyla kaydedildi! 🎉");
        setRefreshKey(refreshKey + 1);
        setIsVoting(prev => ({ ...prev, [listJoyId]: false }));
      },
      onError: (e) => {
        alert("Hata: " + e.message);
        setIsVoting(prev => ({ ...prev, [listJoyId]: false }));
      }
    });
  };

  const handleDelist = (listJoyId: string) => {
    if (!isAdmin || !adminCapId) return;
    setIsDelisting(prev => ({ ...prev, [listJoyId]: true }));

    const tx = delistTx(PACKAGE_ID, adminCapId, listJoyId);
    signAndExecute({ transaction: tx as any }, {
      onSuccess: async ({ digest }) => {
        await suiClient.waitForTransaction({ digest });
        alert("Başarıyla yayından kaldırıldı!");
        setRefreshKey(refreshKey + 1);
        setIsDelisting(prev => ({ ...prev, [listJoyId]: false }));
      },
      onError: (e) => {
        alert("Hata: " + e.message);
        setIsDelisting(prev => ({ ...prev, [listJoyId]: false }));
      }
    });
  };

  if (isLoading) return <div className="text-center p-10 text-slate-400">Yükleniyor...</div>;

  const objects = (data as any) || [];

  // Dinamik Sıralama: En çok oy alandan en az oy alana doğru
  const sortedObjects = [...objects].sort((a: any, b: any) => {
    const votesA = a.data?.content?.fields?.joy?.fields?.votes?.length || 0;
    const votesB = b.data?.content?.fields?.joy?.fields?.votes?.length || 0;
    return votesB - votesA;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sortedObjects.map((obj: any, index: number) => {
        const fields = obj.data?.content?.fields;
        const joyFields = fields?.joy?.fields;
        if (!joyFields) return null;

        const rank = index + 1;
        const isWinner = rank === 1;

        return (
          <div
            key={obj.data?.objectId}
            className={`glass-card rounded-3xl overflow-hidden group transition-all duration-500 hover:scale-[1.02] ${isWinner ? "ring-2 ring-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]" : ""
              }`}
          >
            <div className="relative">
              <img src={joyFields?.img_url} className="w-full h-64 object-cover" alt="Joy" />

              {/* Sıralama Badge */}
              <div className={`absolute top-4 left-4 px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest backdrop-blur-md shadow-xl flex items-center gap-2 ${rank === 1 ? "bg-cyan-500 text-slate-950" :
                rank === 2 ? "bg-slate-300 text-slate-900" :
                  rank === 3 ? "bg-orange-400 text-slate-900" :
                    "bg-slate-800/80 text-slate-300 border border-slate-700"
                }`}>
                {rank === 1 ? "🏆 " : ""}
                {rank}. SIRA
              </div>

              {isAdmin && (
                <button
                  onClick={() => handleDelist(obj.data?.objectId)}
                  disabled={isDelisting[obj.data?.objectId]}
                  className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-500 p-2 rounded-xl text-white transition-all z-10"
                >
                  {isDelisting[obj.data?.objectId] ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                </button>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{joyFields?.name}</h3>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">ID: {obj.data?.objectId.slice(0, 10)}...</p>
                </div>
                <div className={`px-3 py-1 rounded-lg flex flex-col items-center ${isWinner ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-slate-800'}`}>
                  <span className={`text-[10px] font-bold uppercase tracking-tighter ${isWinner ? 'text-cyan-400' : 'text-slate-500'}`}>SKOR</span>
                  <span className={`text-lg font-black leading-none ${isWinner ? 'text-cyan-400' : 'text-white'}`}>
                    {joyFields?.votes?.length || 0}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleVote(obj.data?.objectId)}
                disabled={isVoting[obj.data?.objectId]}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
              >
                {isVoting[obj.data?.objectId] ? <Loader2 className="animate-spin" size={18} /> : <ThumbsUp size={18} />}
                OY VER
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
