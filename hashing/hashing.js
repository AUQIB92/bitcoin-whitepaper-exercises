"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};
const genBlk = {
	index: 0,
	prevHash: "000000",
	data: "",
	timestamp: Date.now()

}
genBlk.hash = blockHash(genBlk)

// Genesis block
Blockchain.blocks.push(genBlk);

// TODO: insert each line into blockchain
for (let line of poem) {

	Blockchain.blocks.push(createBlock(line))


}
function createBlock(data) {
	let blk = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
		data: data,
		timestamp: Date.now

	}
	blk.hash = blockHash(blk);
	console.log("Hash of Block", Blockchain.blocks.length, "is", blk.hash)
	console.log("Prev-Hash of Block", Blockchain.blocks.length, "is", blk.prevHash)
	return blk;
}
//console.log(Blockchain)
console.log(verifyChain(Blockchain));
function verifyChain(blockchain) {
	

	if (blockchain.blocks[0].prevHash === "000000") {

		for (let i = 1; i <= blockchain.blocks.length; i++) {
			if(blockchain.blocks[i].prevHash === blockchain.blocks[i - 1].hash)
			return true
			else
			return false
		}
	}

	return false;
}

// **********************************

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		`${bl.index},;${bl.prevHash};${JSON.stringify(bl.data)};${bl.timestamp}`
	).digest("hex");
}
