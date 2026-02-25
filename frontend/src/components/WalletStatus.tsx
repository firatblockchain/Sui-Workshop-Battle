import React from "react";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

export function WalletStatus() {
    const account = useCurrentAccount();
    const { data: balance } = useSuiClientQuery(
        "getBalance",
        {
            owner: account?.address as string,
        },
        {
            enabled: !!account,
        }
    );

    if (!account) return null;

    const suiBalance = balance ? (Number(balance.totalBalance) / 1_000_000_000).toFixed(3) : "0.000";

    return (
        <div className="glass-card px-4 py-2 rounded-xl border border-slate-700/50 flex items-center gap-3">
            <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Cüzdan Bakiyesi</span>
                <span className="text-sm font-black text-white">{suiBalance} SUI</span>
            </div>
        </div>
    );
}
