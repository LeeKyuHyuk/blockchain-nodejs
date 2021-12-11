import { Block, createBlock } from "./Block";

type Blockchain = {
  blocks: Block[];
};

export function addBlock(blockchain: Blockchain, data: string) {
  const prevBlock = blockchain.blocks[blockchain.blocks.length - 1];
  const newBlock = createBlock(data, prevBlock.hash);
  blockchain.blocks.push(newBlock);
}

function createGenesisBlock(): Block {
  return createBlock("Genesis Block", "");
}

export function createBlockchain(): Blockchain {
  return {
    blocks: [createGenesisBlock()],
  };
}
