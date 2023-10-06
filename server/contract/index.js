const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");

// Set up a connection to the Ethereum network
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.Contract.handleRevert = true;

// Read the contract address from the file system
const deployedAddressPath = path.join(__dirname, "MyContractAddress.bin");
const deployedAddress = fs.readFileSync(deployedAddressPath, "utf8");

// Create a new contract object using the ABI and bytecode
const abi = require("./MyContractAbi.json");
const MyContract = new web3.eth.Contract(abi, deployedAddress);


// Get the certificate
async function getCertificate(id) {
  try {
    const certificates = await MyContract.methods.getCertificate(id).call(); // Call the smart contract function
    return certificates;
  } catch (error) {
    console.error(error);
  }
}

// Set the certificate
const setCertificate = async (certificateID, email, recipient, course, issueDate) => {
  const providersAccounts = await web3.eth.getAccounts(); // Get the list of accounts
  const defaultAccount = providersAccounts[0]; // Get the first account

  try {
    const receipt = await MyContract.methods
      .addCertificate(certificateID, email, recipient, course, issueDate)
      .send({
        from: defaultAccount,
        gas: 1000000,
        gasPrice: 10000000000,
      }); // Send the transaction 

    console.log("Transaction Hash: " + receipt.transactionHash);

    return receipt.transactionHash;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getCertificate, setCertificate };
