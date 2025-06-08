import { NearBindgen, near, LookupMap, call } from "near-sdk-js";

const GAS = BigInt(10_000_000_000_000);
const DEPOSIT = BigInt(1); // 1 yoctoNEAR

@NearBindgen({})
class TokenSwap {
  balances = new LookupMap<bigint>("balances");

  @call({})
  ft_on_transfer({
    sender_id,
    amount,
    msg,
  }: {
    sender_id: string;
    amount: string;
    msg: string;
  }) {
    const tokenId = near.predecessorAccountId();

    // This method gets called when someone transfers tokens to this contract.
  }

  @call({})
  swap({ amount }: { amount: string }) {
    // Perform the token swap here. Exchange the specified amount of tokens between Alice and Bob.
  }

  @call({})
  ft_withdraw({}: { token_id: string; amount: string }) {
    // User will call this method to withdraw tokens from the contract.
  }
}
