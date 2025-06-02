export type TVenture = {
  id: string;
  name: string;
  description: string;
  fundingGoal: number;
  currentFunding: number;
  owner: string;
  investors: string[];
  status: "open" | "closed" | "funded";
};
