import { NearBindgen, call, NearPromise } from "near-sdk-js";

// maximum gas we are willing to pay for the function call
const GAS = BigInt("50000000000000");
// no deposit attached to the function call
const NO_DEPOSIT = BigInt(0);

@NearBindgen({})
class HelloNear {
  @call({})
  hello() {
    return NearPromise.new("intro-to-near.agorapp.testnet").functionCall(
      "get_secret",
      "",
      NO_DEPOSIT,
      GAS
    );
  }
}
