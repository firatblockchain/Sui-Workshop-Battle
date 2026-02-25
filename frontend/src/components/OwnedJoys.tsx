import React, { useState } from "react";
import { useCurrentAccount, useSuiClientQuery, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { PACKAGE_ID } from "../constants";
import { RefreshProps } from "../types/joy";
import { listJoyTx } from "../utility/transactions";
import { Loader2, List } from "lucide-react";

export function OwnedJoys({ refreshKey, setRefreshKey }: RefreshProps) {
    const account = useCurrentAccount();
    const suiClient = useSuiClient();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();
    const [isListing, setIsListing] = useState<{ [key: string]: boolean }>({});

    const { data, isPending } = useSuiClientQuery(
        "getOwnedObjects",
        {
            owner: account?.address as string,
            filter: {
                StructType: `${PACKAGE_ID}::votejoy::Joy`,
            },
            options: {
                showContent: true,
            },
        },
        {
            enabled: !!account,
            queryKey: ["getOwnedObjects", account?.address, refreshKey],
        }
    );

    const handleList = (joyId: string) => {
        setIsListing(prev => ({ ...prev, [joyId]: true }));

        const tx = listJoyTx(PACKAGE_ID, joyId);
        signAndExecute(
            { transaction: tx as any },
            {
                onSuccess: async ({ digest }) => {
                    await suiClient.waitForTransaction({ digest });
                    setRefreshKey(refreshKey + 1);
                    setIsListing(prev => ({ ...prev, [joyId]: false }));
                },
                onError: () => {
                    setIsListing(prev => ({ ...prev, [joyId]: false }));
                },
            }
        );
    };

    if (!account) return null;
    if (isPending) return <div className="text-slate-400 text-center p-4">Joy'lar yükleniyor...</div>;

    const joys = data?.data || [];

    if (joys.length === 0) return (
        <div className="glass-card p-6 rounded-2xl text-center text-slate-400">
            Henüz bir Joy'un yok. Hemen bir tane oluştur!
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {joys.map((obj: any) => {
                const fields = obj.data?.content?.fields;
                return (
                    <div key={obj.data?.objectId} className="glass-card p-4 rounded-2xl flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <img src={fields?.img_url} alt={fields?.name} className="w-16 h-16 rounded-xl object-cover" />
                            <div className="flex-1 overflow-hidden">
                                <h4 className="font-bold text-white truncate">{fields?.name}</h4>
                                <p className="text-[10px] text-slate-500 truncate">ID: {obj.data?.objectId}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleList(obj.data?.objectId)}
                            disabled={isListing[obj.data?.objectId]}
                            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        >
                            {isListing[obj.data?.objectId] ? <Loader2 className="animate-spin" size={18} /> : <List size={18} />}
                            LİSTELE
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
