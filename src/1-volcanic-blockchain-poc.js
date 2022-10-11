/**
 * INSTRUCTIONS:
 *
 * 1. Code it.
 * 2. Run it on the console:
 *   ```bash
 *   node src/1-volcanic-blockchain-part1.js
 *   ```
 * 3. Create a new feature branch with the code, eg. `feature/myname-blockchain-poc`.
 * 4. Create a new Pull Request.
 */

const SHA256 = require("crypto-js/sha256");
// npm install --save crypto-js

/**
 * The Block class, intended to format the block object.
 */
class Block {
  /**
   * Creates a Block.
   *
   * @param {number} index Where the block sits on the chain.
   * @param {number} timestamp When the block was created (since epoch).
   * @param {unknown} [data] A JSON object with any type of data associated to this block.
   * @param {string|undefined} [previousHash] To ensure the integrity on the blockchain.
   */
  constructor(index, timestamp, data, previousHash) {}

  /**
   * @returns {string} The SHA256 calculated hash
   * of the entire block data.
   */
  calculateHash() {}
}

/**
 * The Blockchain class, containing the chain array of `Blocks`.
 */
class Blockchain {
  // let chain: Array<Block> = [];

  /**
   * Initializes de chain with a genesis block.
   */
  constructor() {
    console.log("=== The Blockchain constructor has been called. ===");
  }

  /**
   * Creates the first block of the chain.
   *
   * Notice: This may contain random data.
   *
   * @returns {Block} The genesis block.
   */
  createGenesisBlock() {}

  /**
   * @returns {Block} The latest block of the chain.
   */
  getLatestBlock() {}

  /**
   * Receives a new block as a parameter and
   * pushes it into the chain.
   *
   * @param {Block} newBlock A Block object containing the new block.
   */
  addBlock(newBlock) {}

  /**
   * Checks if this `Blockchain` is valid by iterating all elements
   * and making sure the current and previous blocks'
   * hashes were not modified.
   *
   * Notice: We don't need to check the genesis block (the first one).
   *
   * @returns {boolean}
   */
  isChainValid() {}
}

let volcanicBlockchain = new Blockchain();
