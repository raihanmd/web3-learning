import { near } from "near-sdk-js";

import type { TEventLogData } from "../types";

export default function logger<T>(event: string, data: T): void {
  near.log({
    standard: "nep-297",
    version: "1.0.0",
    event,
    data,
  } as TEventLogData<T>);
}
