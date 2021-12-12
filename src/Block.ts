import { createHash } from "crypto";
import { createProofOfWork, run } from "./ProofOfWork";

export type Block = {
  timestamp: number;
  data: string;
  prevBlockHash: string;
  hash?: string;
  nonce?: number;
};

function setHash(block: Block): string {
  const timeStamp = block.timestamp.toString();
  const headers = `${block.prevBlockHash}${block.data}${timeStamp}`;
  return createHash("sha256").update(headers).digest("hex");
}

export function createBlock(data: string, prevBlockHash: string): Block {
  const block: Block = {
    timestamp: Date.now(),
    data,
    prevBlockHash,
  };
  const pow = createProofOfWork(block);
  const { nonce, hash } = run(pow);
  block.hash = hash;
  block.nonce = nonce;
  return block;
}
