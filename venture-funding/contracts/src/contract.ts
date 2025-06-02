import { TVenture } from "./../types/index";
// Find all our documentation at https://docs.near.org
import { NearBindgen, LookupSet } from "near-sdk-js";

@NearBindgen({})
class VentureFunding {
  static schema = {
    ventures: { class: LookupSet<TVenture> },
  };

  ventures: LookupSet<TVenture> = new LookupSet<TVenture>("v");
}
