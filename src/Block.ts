import { createHash } from "crypto";

export type Block = {
  timestamp: number;
  data: string;
  prevBlockHash: string;
  hash?: string;
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
  block.hash = setHash(block);
  return block;
}
