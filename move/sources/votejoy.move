module votejoy::votejoy;

// ========= IMPORTS =========

use std::string::String;

// ========= CONSTANTS =========

const EINVALID_VOTE: u64= 1;

// ========= STRUCTS =========

// TODO : define a struct called 'Joy' with:
// - id : UID
// - img_url : String
// - name : String
// - votes : vector<addresses>
// Add 'key' and 'store' abilities 
// public struct Joy has key, store {
//        Your fields here
// }

// TODO : define a struct called 'JoyMetadata' with:
// - id : UID
// - timestamp : u64
// Add 'key' and 'store' abilities 
// public struct JoyMetadata has key, store {
//        Your fields here
// }

// ========= FUNCTIONS =========

// TODO: Write a constructor function 'create_joy'
    // that takes img_url, name and ctx
    // define Joy and transfer Joy
    // freeze JoyMetadata
    //#[allow(lint(self_transfer))]
    // public fun create_joy(img_url: String, name: String, ctx: &mut TxContext) {
    //     // Your code here
    // }
    // transfer::public_transfer(joy, tx_context::sender(ctx)), transfer::freeze_object(metadata)

// TODO: Write a vote function 'vote'
    // that takes adr, joy
    // while using it, check that the same person has not voted
    // push the address vector containing the voter into Joy
    // public fun vote(adr: address, joy: Joy) {
    //     // Your code here
    // }
