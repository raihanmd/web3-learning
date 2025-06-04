import { TVenture } from "./../types/index";
import { NearBindgen, LookupSet, view } from "near-sdk-js";

@NearBindgen({})
class VentureFunding {
  static schema = {
    ventures: { class: LookupSet<TVenture> },
  };

  ventures: LookupSet<TVenture> = new LookupSet<TVenture>("v");

  @view({})
  getVentures() {
    return this.ventures;
  }
}
