const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json');
const port = 1225;

const app = express();
app.use(express.json());
const MerkleTreeInstance = new MerkleTree(niceList);
const MERKLE_ROOT = MerkleTreeInstance.getRoot();// paste the hex string in here, without the 0x prefix


app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {name, proof } = req.body;
const isValidProof = verifyProof(proof, name, MERKLE_ROOT);
  // TODO: prove that a name is in the list 
  const isInTheList = isValidProof;
  if(isInTheList) {
    res.send("You got a gift!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
