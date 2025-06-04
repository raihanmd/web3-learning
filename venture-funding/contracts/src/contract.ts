import {
  PGetVentures,
  PRegisterTVenture,
  TVenture,
  EVentureStatus,
} from "./types/index";
import { NearBindgen, view, Vector, call, near } from "near-sdk-js";
import validate from "./lib/validate";

@NearBindgen({})
class VentureFunding {
  static schema = {
    ventures: { class: Vector<TVenture> },
  };

  ventures: Vector<TVenture> = new Vector<TVenture>("v");

  @view({})
  get_ventures(payload: PGetVentures) {
    validate(payload, {
      from_index: { type: "number", min: 0, default: 0 },
      limit: {
        type: "number",
        min: 1,
        max: Infinity,
        default: 10,
      },
    });
    return this.ventures
      .toArray()
      .slice(payload.from_index, payload.limit + payload.from_index)
      .map((v) => ({
        ...v,
        investors:
          typeof v.investors?.toArray === "function"
            ? v.investors.toArray()
            : Array.isArray(v.investors)
            ? v.investors
            : [],
      }));
  }

  @call({})
  register_venture(payload: PRegisterTVenture) {
    validate(payload, {
      name: { type: "string", required: true, min: 3, max: 50 },
      description: { type: "string", required: true, min: 10, max: 500 },
      fundingGoal: { type: "number", required: true, min: 1 },
    });

    const newVenture: TVenture = {
      ...payload,
      id: `${Date.now()}-${Math.random()}`,
      currentFunding: 0,
      status: EVentureStatus.OPEN,
      investors: new Vector<string>("i"),
      owner: near.predecessorAccountId(),
    };

    this.ventures.push(newVenture);
    return {
      success: true,
      message: `Venture ${newVenture.name} registered successfully`,
    };
  }
}
