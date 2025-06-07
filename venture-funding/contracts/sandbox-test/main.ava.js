import anyTest from "ava";
import { Worker } from "near-workspaces";
import { setDefaultResultOrder } from "dns";

setDefaultResultOrder("ipv4first"); // temp fix for node >v17

/**
 *  @typedef {import('near-workspaces').NearAccount} NearAccount
 *  @type {import('ava').TestFn<{worker: Worker, accounts: Record<string, NearAccount>}>}
 */
const test = anyTest;

test.beforeEach(async (t) => {
  // Create sandbox
  const worker = (t.context.worker = await Worker.init());

  // Deploy contract
  const root = worker.rootAccount;

  const ventureA = await root.createSubAccount("venture-a");

  const ventureB = await root.createSubAccount("venture-b");

  const contract = await root.createSubAccount("contract");

  // Get wasm file path from package.json test script in folder above
  await contract.deploy(process.argv[2]);

  // Save state for test runs, it is unique for each test
  t.context.accounts = { root, contract, ventureA, ventureB };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown().catch((error) => {
    console.log("Failed to stop the Sandbox:", error);
  });
});

test("register venture", async (t) => {
  const { ventureA, contract } = t.context.accounts;
  await ventureA.call(contract, "register_venture", {
    name: "Test Venture",
    description: "This is a test venture",
    fundingGoal: 4_000_000_000_000_000,
  });
  const ventures = await contract.view("get_ventures", {});

  t.is(ventures.length, 1);
  t.is(ventures[0].name, "Test Venture");
  t.is(ventures[0].description, "This is a test venture");
  t.is(ventures[0].fundingGoal, 4_000_000_000_000_000);
  t.is(ventures[0].owner, ventureA.accountId);
});

test("get ventures", async (t) => {
  const { contract } = t.context.accounts;
  const ventures = await contract.view("get_ventures", {});
  t.is(ventures.length, 0);
});
