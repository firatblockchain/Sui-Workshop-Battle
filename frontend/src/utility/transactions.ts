import { Transaction } from "@mysten/sui/transactions";

export function createJoyTx(packageId: string, name: string, imageUrl: string) {
    const tx = new Transaction();
    tx.moveCall({
        target: `${packageId}::votejoy::create_joy`,
        arguments: [tx.pure.string(imageUrl), tx.pure.string(name)],
    });
    return tx;
}

export function listJoyTx(packageId: string, joyId: string) {
    const tx = new Transaction();
    tx.moveCall({
        target: `${packageId}::hub::list_joy`,
        arguments: [tx.object(joyId)],
    });
    return tx;
}

export function voteTx(packageId: string, listJoyId: string) {
    const tx = new Transaction();
    tx.moveCall({
        target: `${packageId}::hub::vote_listed`,
        arguments: [tx.object(listJoyId)],
    });
    return tx;
}

export function delistTx(packageId: string, adminCapId: string, listJoyId: string) {
    const tx = new Transaction();
    tx.moveCall({
        target: `${packageId}::hub::delist`,
        arguments: [tx.object(adminCapId), tx.object(listJoyId)],
    });
    return tx;
}

