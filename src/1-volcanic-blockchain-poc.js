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
  /** @type {number} */
  index;
  /** @type {number} */
  timestamp;
  /** @type {unknown} */
  data;
  /** @type {string|undefined} */
  previousHash;
  /** @type {string} */
  hash;

  /**
   * Creates a Block.
   *
   * @param {number} index Where the block sits on the chain.
   * @param {number} timestamp When the block was created (since epoch).
   * @param {unknown} [data] A JSON object with any type of data associated to this block.
   * @param {string|undefined} [previousHash] To ensure the integrity on the blockchain.
   */
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  /**
   * @returns {string} The SHA256 calculated hash
   * of the entire block data.
   */
  calculateHash() {
    return SHA256(
      `${this.index}${this.timestamp}${JSON.stringify(this.data)}${
        this.previousHash
      }`
    ).toString();
  }

  regenerateHash() {
    this.hash = this.calculateHash();
  }
}

/**
 * The Blockchain class, containing the chain array of `Blocks`.
 */
class Blockchain {
  /** @type {Block[]} */
  chain;

  /**
   * Initializes de chain with a genesis block.
   */
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  /**
   * Creates the first block of the chain.
   *
   * Notice: This may contain random data.
   *
   * @returns {Block} The genesis block.
   */
  createGenesisBlock() {
    const genesisBlock = new Block(0, Date.now());
    return Object.freeze(genesisBlock);
  }

  /**
   * @returns {Block} The latest block of the chain.
   */
  getLatestBlock() {
    // @ts-ignore
    return this.chain.at(-1);
  }

  /**
   * Receives a new block as a parameter and
   * pushes it into the chain.
   *
   * @param {Block} newBlock A Block object containing the new block.
   */
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.regenerateHash();

    this.chain.push(Object.freeze(newBlock));
  }

  /**
   * Checks if this `Blockchain` is valid by iterating all elements
   * and making sure the current and previous blocks'
   * hashes were not modified.
   *
   * Notice: We don't need to check the genesis block (the first one).
   *
   * @returns {boolean}
   */
  isChainValid() {
    return this.chain.every((block, index, chain) => {
      // Skip the genesis block.
      if (index === 0) return true;

      if (block.hash !== block.calculateHash()) return false;

      const previousBlock = chain[index - 1];
      return previousBlock.hash === block.previousHash;
    });
  }
}

const fuetChain = new Blockchain();

const block1 = new Block(1, Date.now(), { type: "Espetec" });
fuetChain.addBlock(block1);

const block2 = new Block(2, Date.now(), { type: "Secallona" });
fuetChain.addBlock(block2);

console.table(fuetChain.chain);
console.log("Is chain valid?", fuetChain.isChainValid());
