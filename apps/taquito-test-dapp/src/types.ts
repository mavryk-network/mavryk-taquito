export interface TestResult {
  success: boolean;
  opHash: string;
  output?: string;
  sigDetails?: { input: string; formattedInput: string; bytes: string };
  confirmationObsOutput?: { level: number; currentConfirmation: number }[];
}

export interface TestSettings {
  id: string;
  name: string;
  description: string;
  documentation?: string;
  keyword: string;
  run: (input?: any) => Promise<TestResult>;
  showExecutionTime: boolean;
  inputRequired: boolean;
  inputType?: "string" | "set-limits" | "sapling" | "delegate" | "stake" | "unstake" | "etherlink";
  lastResult: { option: "none" | "some"; val: boolean };
}

export type MavrykContractAddress = `KT1${string}`;
export type MavrykAccountAddress = `mv${"1" | "2" | "3"}${string}`;

// export enum NetworkType {
//   MAINNET = "mainnet",
//   GHOSTNET = "basenet",
//   WEEKLYNET = "weeklynet",
//   ATLASNET = "atlasnet",
//   BOREASNET = "boreasnet",
//   CUSTOM = "custom"
// }
