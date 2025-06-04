import { Vector } from "near-sdk-js";

//* ==================Contract Related Types==================
export type TVenture = {
  id: string;
  name: string;
  description: string;
  fundingGoal: number;
  currentFunding: number;
  owner: string;
  investors: Vector<string>;
  status: EVentureStatus;
};

export enum EVentureStatus {
  OPEN = "open",
  CLOSED = "closed",
  FUNDED = "funded",
}

export type PRegisterTVenture = Omit<
  TVenture,
  "id" | "currentFunding" | "status" | "investors" | "owner"
>;

export type PGetVentures = {
  from_index: number;
  limit: number;
};

//* ==================Validation Schema==================
export type ValidationRule = {
  type?: "string" | "number";
  min?: number;
  max?: number;
  required?: boolean;
  default?: any;
};

export type ValidationSchema = {
  [key: string]: ValidationRule;
};
