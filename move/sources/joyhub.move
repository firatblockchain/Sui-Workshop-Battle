module votejoy::hub;

// ========= IMPORTS =========

use votejoy::votejoy::{Joy,vote};
use votejoy::admin::AdminCap;
use sui::event;

// ========= STRUCTS =========

// TODO : define a struct called 'ListJoy' with:
// - id : UID
// - joy : Joy
// - owner : address
// Add 'key' and 'store' abilities 
// public struct ListJoy has key, store {
//       // Your fields here
// }

// TODO : define a struct called 'JoyListed' with:
// - list_joy_id : ID
// - owner : address
// - timestamp : u64
// Add 'copy' and 'drop' abilities
// public struct JoyListed has copy, drop {
//      // Your fields here
// }

// ========= FUNCTIONS =========

// TODO: Write a constructor function 'list_joy'
    // that takes joy, ctx
    // define ListJoy and emit JoyListed
    // share ListJoy
    // public fun list_joy(joy: Joy, ctx: &mut TxContext) {
    //     // Your code here
    // }
    // Hint : transfer::share_object(list_joy), tx_context::epoch_timestamp_ms(ctx),tx_context::sender(ctx), object::id(&list_joy)

// TODO : Write a function 'vote_listed' that takes 'list_joy: &mut ListJoy' and 'ctx: &mut TxContext'
// use votejoy::votejoy::vote;
// public fun vote_listed(list_joy: &mut ListJoy, ctx: &mut TxContext) {
//      // Your code here
//}

// ========= ADMIN FUNCTIONS =========

//TODO : Write a function 'delist' that takes '_: &AdminCap' and 'list_joy: ListJoy'
// destruct ListJoy
// transfer Joy to owner
// delete id
// public fun delist (_: &AdminCap, list_joy: ListJoy){
//      // Your code here
// }
// transfer::public_transfer(joy, owner), object::delete(id)

