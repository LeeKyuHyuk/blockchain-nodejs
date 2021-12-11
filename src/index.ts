import { addBlock, createBlockchain } from "./Blockchain";

function main() {
  const blockchain = createBlockchain();

  addBlock(blockchain, "Send 1 BTC to KyuHyuk");
  addBlock(blockchain, "Send 2 more BTC to KyuHyuk");

  for (let index = 0; index < blockchain.blocks.length; index++) {
    const block = blockchain.blocks[index];
    console.log(`Prev. hash: ${block.prevBlockHash}`);
    console.log(`Data: ${block.data}`);
    console.log(`Hash: ${block.hash}`);
    console.log();
  }
}

main();
