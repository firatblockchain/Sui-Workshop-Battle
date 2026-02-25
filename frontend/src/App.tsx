import React, { useState } from "react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Leaderboard } from "./components/Leaderboard.tsx";
import { RegisterCandidate } from "./components/RegisterCandidate.tsx";
import { OwnedJoys } from "./components/OwnedJoys.tsx";
import { WalletStatus } from "./components/WalletStatus.tsx";

function App() {
    const account = useCurrentAccount();
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="min-h-screen">
            <header className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/50 sticky top-0 backdrop-blur-md z-50">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center group overflow-hidden">
                        <img
                            src="https://media.licdn.com/dms/image/v2/D4D0BAQEyjpOSwgCDmA/company-logo_200_200/B4DZXNGEnmHkAQ-/0/1742902676519/firat_blockchain_logo?e=1773273600&v=beta&t=yJnOxP5EAH2k9P86GW4DIgiARUjxQlUJOTJ101tOAp8"
                            alt="Fırat Blockchain Logo"
                            className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl font-black tracking-tighter leading-none text-white">
                            VOTEJOY
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-red-500 font-bold tracking-[0.3em] uppercase">
                                POWERED BY FIRAT BLOCKCHAIN
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <WalletStatus />
                    <ConnectButton />
                </div>
            </header>

            <main className="animate-gradient min-h-screen max-w-full mx-auto p-6 space-y-16">
                <div className="max-w-6xl mx-auto flex flex-col gap-6 pt-10">

                    {/* Üst satır: Battle info + NFT Yükle yan yana */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-8 rounded-[2rem]">
                            <h2 className="text-4xl font-black mb-2">Sui Workshop <span className="text-cyan-400">Battle</span></h2>
                            <p className="text-slate-400 text-sm mb-6">NFT'ni oluştur, oylamaya katıl ve Sui ağındaki en popüler sen ol!</p>
                        </div>

                        <div className="glass-card p-8 rounded-[2rem]">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"> Kendi NFT'ni Yükle</h3>
                            <RegisterCandidate refreshKey={refreshKey} setRefreshKey={setRefreshKey} />
                        </div>
                    </div>

                    {/* Alt satır: OwnedJoys tam genişlikte */}
                    <div className="glass-card p-8 rounded-[2rem]">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"> Sahip Olduğun Joy'lar</h3>
                        <OwnedJoys refreshKey={refreshKey} setRefreshKey={setRefreshKey} />
                    </div>

                </div>


                <section className="max-w-6xl mx-auto pb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-slate-800"></div>
                        <h2 className="text-3xl font-black tracking-tighter italic">LİDERLİK TABLOSU</h2>
                        <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-slate-800"></div>
                    </div>
                    <Leaderboard refreshKey={refreshKey} setRefreshKey={setRefreshKey} />
                </section>
            </main>
        </div>
    );
}

export default App;
