import {
  PGetVentures,
  PRegisterTVenture,
  TVenture,
  EVentureStatus,
} from "./types/index";
import {
  NearBindgen,
  Vector,
  bytes,
  call,
  decode,
  near,
  view,
} from "near-sdk-js";
import validate from "./lib/validate";
import logger from "./lib/logger";

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
      id: `${near.blockTimestamp()}`,
      currentFunding: 0,
      status: EVentureStatus.OPEN,
      investors: new Vector<string>("i"),
      owner: near.predecessorAccountId(),
    };

    this.ventures.push(newVenture);

    logger("register_venture", newVenture);

    return {
      success: true,
      message: `Venture ${newVenture.name} registered successfully`,
    };
  }

  @view({})
  get_my_ventures(payload: PGetVentures) {
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
      .filter((v) => v.owner === near.predecessorAccountId())
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
  get_signer_acc_pk() {
    return decode(near.signerAccountPk());
  }

  @call({})
  get_storage_get_evicted() {
    return `default: ${near.storageGetEvicted()}\nraw: ${decode(near.storageGetEvictedRaw())}`;
  }

  @call({})
  get_storage_has_key() {
    return `default: ${near.storageHasKey("v-0")}\nraw: ${near.storageHasKeyRaw(bytes("v-0"))}`;
  }

  @call({})
  get_storage_read() {
    return `default: ${near.storageRead("v-0")}\nraw: ${decode(near.storageReadRaw(bytes("v-0")))}`;
  }

  @call({})
  get_storage_usage() {
    return near.storageUsage();
  }

  @call({})
  get_value_return() {
    return near.valueReturn("Hello");
  }
}
