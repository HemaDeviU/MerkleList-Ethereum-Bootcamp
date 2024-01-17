const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
const merkleTree = new MerkleTree(niceList);
const nameToFind = 'Shelly Toy';
const index =  niceList.findIndex(name => name === nameToFind);
if(index!== -1)
{
const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
name: nameToFind,
proof: proof  });
console.log('Name:', nameToFind);
  console.log({gift});
}
else {
  console.log(`${nameToFind} is not in the list`);
}
}

main();