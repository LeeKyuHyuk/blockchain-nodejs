import { createHash } from "crypto";
import { Block } from "./Block";

const targetBits = BigInt(24n);

type ProofOfWork = {
  block: Block;
  target: BigInt;
};

export function createProofOfWork(block: Block): ProofOfWork {
  const target = BigInt(1n << (256n - targetBits));
  const pow: ProofOfWork = { block, target };
  return pow;
}

function prepareData(pow: ProofOfWork, nonce: number): string {
  const data = `${pow.block.prevBlockHash}${
    pow.block.data
  }${pow.block.timestamp.toString(16)}${targetBits.toString(
    16
  )}${nonce.toString(16)}`;
  return data;
}

type ProofOfWorkOutput = {
  nonce: number;
  hash: string;
};

export function run(pow: ProofOfWork): ProofOfWorkOutput {
  let hashInt: BigInt;
  let hash: string;
  let nonce = 0;

  console.log(`Mining the block containing "${pow.block.data}"`);

  while (nonce < Number.MAX_SAFE_INTEGER) {
    const data = prepareData(pow, nonce);
    hash = createHash("sha256").update(data).digest("hex");
    hashInt = BigInt(`0x${hash}`);

    if (hashInt < pow.target) {
      console.log(`\r${hash}`);
      break;
    } else {
      nonce++;
    }
  }
  console.log("\n");

  return { nonce, hash };
}

export function validate(pow: ProofOfWork): boolean {
  let hashInt: BigInt;

  const data = prepareData(pow, pow.block.nonce);
  const hash = createHash("sha256").update(data).digest("hex");
  hashInt = BigInt(`0x${hash}`);

  const isVaild = hashInt < pow.target;

  return isVaild;
}
